/**
 * Block registry that maps block types to their Settings and Preview components.
 * This keeps block type wiring in one place for easier extension.
 */
import { WelcomeSettings } from './components/settings/WelcomeSettings';
import { MultipleChoiceSettings } from './components/settings/MultipleChoiceSettings';
import { LegalSettings } from './components/settings/LegalSettings';
import { FiveSecondTestSettings } from './components/settings/FiveSecondTestSettings';
import { CardSortSettings } from './components/settings/CardSortSettings';
import { TreeTestSettings } from './components/settings/TreeTestSettings';
import { YesNoSettings } from './components/settings/YesNoSettings';
import { ContextSettings } from './components/settings/ContextSettings';
import { OpinionScaleSettings } from './components/settings/OpinionScaleSettings';
import { SimpleInputSettings } from './components/settings/SimpleInputSettings';
import { OpenQuestionSettings } from './components/settings/OpenQuestionSettings';
import { AppTestSettings } from './components/settings/AppTestSettings';
import { PrototypeTestSettings } from './components/settings/PrototypeTestSettings';

import { WebsiteTestPreview } from './components/previews/WebsiteTestPreview';
import { AppTestPreview } from './components/previews/AppTestPreview';
import { OpenQuestionPreview } from './components/previews/OpenQuestionPreview';
import { SimpleInputPreview } from './components/previews/SimpleInputPreview';
import { OpinionScalePreview } from './components/previews/OpinionScalePreview';
import { MultipleChoicePreview } from './components/previews/MultipleChoicePreview';
import { ContextPreview } from './components/previews/ContextPreview';
import { YesNoPreview } from './components/previews/YesNoPreview';
import { TreeTestPreview } from './components/previews/TreeTestPreview';
import { CardSortPreview } from './components/previews/CardSortPreview';
import { FiveSecondTestPreview } from './components/previews/FiveSecondTestPreview';
import { LegalPreview } from './components/previews/LegalPreview';
import { WelcomePreview } from './components/previews/WelcomePreview';
import { ThankYouPreview } from './components/previews/ThankYouPreview';

export const BLOCK_REGISTRY = {
  welcome: { Settings: WelcomeSettings, Preview: WelcomePreview },
  legal: { Settings: LegalSettings, Preview: LegalPreview },
  mission: { Settings: PrototypeTestSettings, Preview: WebsiteTestPreview },
  app_test: { Settings: AppTestSettings, Preview: AppTestPreview },
  prototype_test: { Settings: PrototypeTestSettings, Preview: WebsiteTestPreview },
  multiple_choice: { Settings: MultipleChoiceSettings, Preview: MultipleChoicePreview },
  five_second_test: { Settings: FiveSecondTestSettings, Preview: FiveSecondTestPreview },
  context: { Settings: ContextSettings, Preview: ContextPreview },
  card_sort: { Settings: CardSortSettings, Preview: CardSortPreview },
  tree_test: { Settings: TreeTestSettings, Preview: TreeTestPreview },
  scale: { Settings: OpinionScaleSettings, Preview: OpinionScalePreview },
  yesno: { Settings: YesNoSettings, Preview: YesNoPreview },
  input: { Settings: OpenQuestionSettings, Preview: OpenQuestionPreview },
  simple_input: { Settings: SimpleInputSettings, Preview: SimpleInputPreview },
  thankyou: { Settings: null, Preview: ThankYouPreview },
};
