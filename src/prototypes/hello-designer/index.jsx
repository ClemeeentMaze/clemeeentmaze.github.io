/**
 * Start Here Prototype
 * 
 * An onboarding prototype that introduces designers to the prototyping environment.
 * Covers annotations, navigation, and points to the design system showcase.
 * 
 * @returns {JSX.Element}
 */
import { useRef, useEffect } from "react";
import {
  Text,
  Heading,
  Flex,
  Box,
  CTAButton,
  TextInputControl,
  Toggle,
  Tag,
  Annotation,
  IconFigure,
} from "@framework/components/ariane";
import { useAnnotations } from "@framework/context/AnnotationContext";
import annotationsData from "./annotations.json";

/**
 * StartHere component - onboarding prototype for designers
 */
function StartHere() {
  // Get annotation context
  const { setAnnotationData, annotations } = useAnnotations();

  // Refs for annotation targets - keys must match targetId in annotations.json
  const targetRefs = {
    demoButton: useRef(null),
    demoInput: useRef(null),
    demoToggle: useRef(null),
  };

  // Register annotations with context on mount
  useEffect(() => {
    setAnnotationData(annotationsData);
    
    // Cleanup on unmount
    return () => setAnnotationData(null);
  }, [setAnnotationData]);

  return (
    <div 
      className="w-full min-h-full overflow-y-auto"
      style={{ 
        background: 'linear-gradient(135deg, #FFF9F5 0%, #F0F7FF 100%)',
      }}
    >
      <div className="max-w-2xl mx-auto px-lg py-xl">
        
        {/* ==================== SECTION 1: WELCOME ==================== */}
        <section className="mb-xxl">
          {/* Welcome Badge */}
          <div className="text-center mb-lg">
            <Tag 
              bg="#0568FD" 
              color="#FFF"
              className="mb-md"
            >
              WELCOME
            </Tag>
            
            <Heading level={1} align="center" className="mb-sm">
              Start Here
            </Heading>
            
            <Text 
              type="lead" 
              color="default.main.secondary" 
              align="center"
              className="mb-lg"
            >
              A prototyping playground to explore multiple concepts at high fidelity, 
              optimized to work with Cursor.
            </Text>
          </div>

          {/* Design System Note Card */}
          <Box 
            className="bg-white rounded-lg p-lg border border-neutral-200 mb-lg"
          >
            <Flex gap="SM" alignItems="flex-start">
              <IconFigure name="figma" color="featured" size="MD" mode="light" />
              <div>
                <Text variant="label" className="mb-xs block font-semibold">
                  Built with the Ariane Design System
                </Text>
                <Text color="default.main.secondary" className="mb-sm">
                  This tool includes a simplified copy of the Ariane Design System. 
                  It may not reflect the latest production components. 
                  For a component showcase, check out the{" "}
                  <Text 
                    as="span" 
                    color="default.extra.awake" 
                    className="font-medium inline"
                  >
                    "Ariane Components"
                  </Text>
                  {" "}prototype in the sidebar.
                </Text>
              </div>
            </Flex>
          </Box>
        </section>

        {/* ==================== SECTION 2: ANNOTATIONS DEMO ==================== */}
        <section className="mb-xxl">
          <Heading level={2} className="mb-sm">
            Developer Annotations
          </Heading>
          <Text color="default.main.secondary" className="mb-lg">
            Annotations are notes attached to UI elements — they help communicate 
            design intent, behavior details, and implementation notes to developers.
            Switch to the <Text as="span" className="font-medium inline">"Annotations"</Text> tab 
            in the top-right panel to try them out.
          </Text>

          {/* Annotations Demo Card */}
          <Box 
            className="bg-white rounded-lg p-lg border border-neutral-200 mb-md"
          >
            <Text variant="label" className="mb-md block text-neutral-500">
              Click the blue dots on these elements to see their annotations:
            </Text>

            <Flex flexDirection="column" gap="LG">
              {/* Demo Input */}
              <div ref={targetRefs.demoInput}>
                <Text variant="label" className="mb-xs block">Example Input</Text>
                <TextInputControl
                  placeholder="Click the annotation dot →"
                  readOnly
                />
              </div>

              {/* Demo Toggle */}
              <Flex 
                ref={targetRefs.demoToggle}
                justifyContent="space-between" 
                alignItems="center"
                className="py-sm"
              >
                <div>
                  <Text variant="label" className="block">Example Setting</Text>
                  <Text variant="caption" color="default.main.secondary">
                    Toggles have annotations too
                  </Text>
                </div>
                <Toggle
                  checked={true}
                  onChange={() => {}}
                />
              </Flex>

              {/* Demo Button */}
              <div ref={targetRefs.demoButton}>
                <CTAButton 
                  emphasis="primary"
                  className="w-full"
                >
                  Example Button
                </CTAButton>
              </div>
            </Flex>
          </Box>

          {/* Add Annotation Tip */}
          <Flex 
            alignItems="center" 
            gap="SM" 
            className="bg-blue-50 rounded-lg p-md border border-blue-200"
          >
            <IconFigure name="idea" color="awake" size="MD" mode="light" />
            <Text type="caption" color="default.main.secondary">
              <Text as="span" className="font-medium inline" color="default.main.primary">
                Tip:
              </Text>
              {" "}Select an element in the Cursor browser and ask Cursor to add an annotation to it.
            </Text>
          </Flex>
        </section>

        {/* ==================== SECTION 3: WORKING WITH CURSOR ==================== */}
        <section className="mb-xxl">
          <Heading level={2} className="mb-sm">
            Working with Cursor
          </Heading>
          <Text color="default.main.secondary" className="mb-lg">
            This environment is designed to be managed through Cursor. Just ask!
          </Text>

          {/* Cursor Emphasis Card */}
          <Box 
            className="bg-white rounded-lg p-lg border border-neutral-200 mb-md"
          >
            <Flex gap="SM" alignItems="flex-start" className="mb-md">
              <IconFigure name="sparkles" color="featured" size="MD" mode="light" />
              <div>
                <Text className="font-semibold mb-xs block">
                  Custom Instructions Built-In
                </Text>
                <Text type="caption" color="default.main.secondary">
                  We've set up detailed rules for Cursor so it understands this project. 
                  You can ask it to do things like:
                </Text>
              </div>
            </Flex>

            <Flex flexDirection="column" gap="SM" className="ml-[44px]">
              <Flex alignItems="center" gap="SM">
                <span className="text-sm text-neutral-400">→</span>
                <Text type="caption" color="default.main.primary">
                  "Create a new prototype called [name]"
                </Text>
              </Flex>
              <Flex alignItems="center" gap="SM">
                <span className="text-sm text-neutral-400">→</span>
                <Text type="caption" color="default.main.primary">
                  "Add annotations to this button explaining the loading state"
                </Text>
              </Flex>
              <Flex alignItems="center" gap="SM">
                <span className="text-sm text-neutral-400">→</span>
                <Text type="caption" color="default.main.primary">
                  "Archive/hide this prototype"
                </Text>
              </Flex>
              <Flex alignItems="center" gap="SM">
                <span className="text-sm text-neutral-400">→</span>
                <Text type="caption" color="default.main.primary">
                  "Add a form with validation to my prototype"
                </Text>
              </Flex>
            </Flex>
          </Box>

          {/* No Code Required Hint */}
          <Flex 
            alignItems="center" 
            gap="SM" 
            className="bg-emerald-50 rounded-lg p-md border border-emerald-200"
          >
            <IconFigure name="goal" color="success" size="MD" mode="light" />
            <Text type="caption" color="default.main.secondary">
              <Text as="span" className="font-medium inline" color="default.main.primary">
                No coding required.
              </Text>
              {" "}Cursor knows the project structure, available components, and best practices. 
              Describe what you want in plain language.
            </Text>
          </Flex>
        </section>

        {/* ==================== SECTION 4: NAVIGATION TIPS ==================== */}
        <section className="mb-xl">
          <Heading level={2} className="mb-sm">
            Getting Around
          </Heading>
          <Text color="default.main.secondary" className="mb-lg">
            The panel on the right has two tabs:
          </Text>

          <Flex flexDirection="column" gap="MD">
            {/* Tip 1: Prototypes Tab */}
            <Box 
              className="bg-white rounded-lg p-md border border-neutral-200"
            >
              <Flex gap="SM" alignItems="flex-start">
                <IconFigure name="folder" color="awake" size="MD" mode="light" />
                <div>
                  <Text className="font-medium mb-xs block">
                    Prototypes Tab
                  </Text>
                  <Text type="caption" color="default.main.secondary">
                    Switch between different prototypes. Each prototype is its own 
                    isolated experiment. Click the link icon to copy a shareable 
                    preview URL (hides the panel for clean presentations).
                  </Text>
                </div>
              </Flex>
            </Box>

            {/* Tip 2: Annotations Tab */}
            <Box 
              className="bg-white rounded-lg p-md border border-neutral-200"
            >
              <Flex gap="SM" alignItems="flex-start">
                <IconFigure name="message" color="warning" size="MD" mode="light" />
                <div>
                  <Text className="font-medium mb-xs block">
                    Annotations Tab
                  </Text>
                  <Text type="caption" color="default.main.secondary">
                    View all annotations for the current prototype, grouped by scope. 
                    Use the eye icons to show/hide annotation groups. Hover over 
                    an annotation to highlight it on the page.
                  </Text>
                </div>
              </Flex>
            </Box>

            {/* Tip 3: Components */}
            <Box 
              className="bg-white rounded-lg p-md border border-neutral-200"
            >
              <Flex gap="SM" alignItems="flex-start">
                <IconFigure name="layers" color="featured" size="MD" mode="light" />
                <div>
                  <Text className="font-medium mb-xs block">
                    Ariane Components
                  </Text>
                  <Text type="caption" color="default.main.secondary">
                    Explore the full design system in the "Ariane Components" prototype — 
                    it showcases every available component with interactive examples.
                  </Text>
                </div>
              </Flex>
            </Box>
          </Flex>
        </section>

        {/* ==================== FOOTER ==================== */}
        <footer className="text-center pt-lg border-t border-neutral-200">
          <Flex alignItems="center" justifyContent="center" gap="SM">
            <Text color="default.main.secondary">
              Happy prototyping!
            </Text>
            <IconFigure name="maze-completed" color="success" size="SM" mode="light" />
          </Flex>
        </footer>
      </div>

      {/* Developer Handover Annotations - Rendered from JSON data */}
      {annotations.map((annotation) => {
        const targetRef = targetRefs[annotation.targetId];
        if (!targetRef) return null;
        
        return (
          <Annotation 
            key={annotation.id}
            id={annotation.id}
            targetRef={targetRef}
            type={annotation.type}
          >
            <strong>{annotation.title}</strong>
            <p>{annotation.body}</p>
          </Annotation>
        );
      })}
    </div>
  );
}

StartHere.Title = "Start Here";
StartHere.Description = "An introduction to the prototyping environment";
StartHere.Order = 1;
StartHere.Group = "Starter prototypes";

export default StartHere;
