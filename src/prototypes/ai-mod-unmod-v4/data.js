/**
 * UNMODERATED BUILDER - DATA FILE
 * ================================
 *
 * USE CASES:
 * This file contains predefined study configurations in USE_CASES.
 * - complete_demo - One block of each type (reference/demo)
 * - checkout_usability - Placeholder for e-commerce checkout study
 * - onboarding_test - Placeholder for onboarding flow study
 *
 * HOW TO ADD A NEW USE CASE:
 * 1. Add a new entry to USE_CASES with:
 *    - id, name, description
 *    - studyMeta (name, deviceTypes, recordAudio)
 *    - blocks array (use createBlock() or copy from BLOCK_DEFAULTS)
 * 2. Add the id to StateControls.useCase.options in index.jsx
 *
 * HOW TO CREATE A SEPARATE PROTOTYPE VERSION:
 * 1. Duplicate the entire `unmoderated-builder/` folder
 * 2. Rename it (e.g., `unmoderated-checkout-study/`)
 * 3. Keep only the relevant use case or create new ones
 * 4. Update the prototype Title/Description in index.jsx
 */

/**
 * Centralized option lists used by settings components.
 */
export const FIELD_OPTIONS = {
  taskPosition: [
    { value: 'bottom-left', label: 'Bottom Left' },
    { value: 'bottom-right', label: 'Bottom Right' },
    { value: 'top-left', label: 'Top Left' },
    { value: 'top-right', label: 'Top Right' },
  ],
  scaleType: ['numerical', 'stars', 'emotions'],
  inputType: ['text', 'numerical', 'date', 'email'],
  responseType: ['icons', 'emotions'],
  selectType: ['single', 'multi'],
  sortingType: ['closed', 'open'],
};

/**
 * Block type configurations with their icons and colors.
 * Colors and icons match Figma "beta-builder-bar" design.
 * Icon names are from maze-m-icons font.
 * arianeColor: color token for IconFigure component (used with mode="dark")
 */
export const BLOCK_TYPES = {
  welcome: {
    name: 'Welcome',
    iconName: 'log-in-hand',
    arianeColor: 'primary',
    description: 'Greet participants and set expectations',
  },
  mission: {
    name: 'Website Test',
    iconName: 'website',
    arianeColor: 'awake',
    description: 'Test a website or prototype with specific tasks',
  },
  app_test: {
    name: 'App Test',
    iconName: 'mobile-test-block',
    arianeColor: 'awake',
    description: 'Test a mobile app with specific tasks',
  },
  prototype_test: {
    name: 'Prototype Test',
    iconName: 'prototype',
    arianeColor: 'awake',
    description: 'Test a Figma prototype with specific tasks',
  },
  multiple_choice: {
    name: 'Multiple Choice',
    iconName: 'multiple-choice',
    arianeColor: 'cyan',
    description: 'Ask participants to select from options',
  },
  input: {
    name: 'Open Question',
    iconName: 'open-question',
    arianeColor: 'lila',
    description: 'Collect free-form text responses',
  },
  simple_input: {
    name: 'Simple Input',
    iconName: 'simple-input',
    arianeColor: 'lila',
    description: 'Collect structured input like email, date, or numbers',
  },
  scale: {
    name: 'Opinion Scale',
    iconName: 'star',
    arianeColor: 'forest',
    description: 'Measure sentiment on a scale',
  },
  yesno: {
    name: 'Yes/No',
    iconName: 'checkmark-cross-square',
    arianeColor: 'lila',
    description: 'Simple binary question',
  },
  legal: {
    name: 'Legal Screen',
    iconName: 'legal',
    arianeColor: 'dormant',
    description: 'Present legal documents like NDAs or privacy policies',
  },
  five_second_test: {
    name: '5-Second Test',
    iconName: 'timer',
    arianeColor: 'forest',
    description: 'Show an image briefly to capture first impressions',
  },
  context: {
    name: 'Context Screen',
    iconName: 'context-question',
    arianeColor: 'critical',
    description: 'Provide context or instructions before tasks',
  },
  card_sort: {
    name: 'Card Sort',
    iconName: 'cards',
    arianeColor: 'lila',
    description: 'Have participants sort cards into categories',
  },
  tree_test: {
    name: 'Tree Test',
    iconName: 'tree-test-question',
    arianeColor: 'lila',
    description: 'Test information architecture with a tree structure',
  },
  thankyou: {
    name: 'Thank you',
    iconName: 'success',
    arianeColor: 'primary',
    description: 'Thank participants and provide next steps',
  },
};

/**
 * Default field values per block type.
 * These ensure every input has a backing data field.
 */
export const BLOCK_DEFAULTS = {
  welcome: {
    title: 'Welcome to our study',
    description: 'Thank you for participating! This study will take about 5 minutes.',
    customMessageEnabled: true,
    imageEnabled: false,
    imageUrl: null,
  },
  legal: {
    title: 'Consent to participate',
    description:
      'Before we begin, please confirm you are at least 18 years old and agree to participate in this research study.',
    documentUrl: null,
    conditionsEnabled: false,
  },
  mission: {
    title: 'Find the checkout button',
    description: 'Navigate to the product page and complete the purchase flow.',
    prototypeUrl: null,
    hasPrototype: false,
    conditionsEnabled: false,
  },
  app_test: {
    title: 'Try using the filter feature',
    description: 'Open the filters and show only items under $25.',
    taskLinkEnabled: false,
    taskLinkUrl: '',
  },
  prototype_test: {
    title: 'Try using the filter feature',
    description: 'Open the filters and show only items under $25.',
    prototypeUrl: null,
    hasPrototype: false,
    taskPosition: 'bottom-left',
    showCustomMessage: false,
    conditionsEnabled: false,
  },
  multiple_choice: {
    title: 'What devices do you use on a weekly basis?',
    description: 'Base it off of most weeks, not just this past week.',
    imageEnabled: false,
    imageUrl: null,
    selectType: 'single',
    shuffleEnabled: true,
    choices: ['Laptop', 'Phone', 'Tablet'],
    otherOptionEnabled: false,
    conditionsEnabled: false,
  },
  five_second_test: {
    title: 'First impressions',
    description: 'What do you remember from the image you just saw?',
    customizeInstructions: false,
    imageUrl: null,
    seconds: 5,
    conditionsEnabled: false,
  },
  context: {
    title: 'Before you begin',
    description:
      "Here's a quick overview to help you understand what you'll be looking at.",
    imageEnabled: false,
    imageUrl: null,
    conditionsEnabled: false,
  },
  card_sort: {
    title: 'Organize our features',
    description: 'Sort these feature cards into categories that make sense to you.',
    customizeInstructions: false,
    cards: [
      { id: 'card-1', label: 'Analytics' },
      { id: 'card-2', label: 'Team management' },
      { id: 'card-3', label: 'Billing' },
    ],
    shuffleCards: false,
    allowContinue: false,
    requireRanking: false,
    sortingType: 'closed',
    categories: [
      { id: 'cat-1', label: 'Account' },
      { id: 'cat-2', label: 'Reports' },
    ],
    shuffleCategories: false,
    conditionsEnabled: false,
  },
  tree_test: {
    title: 'Find payment settings',
    description: 'Where would you go to update your saved payment method?',
    treeNodes: [
      {
        id: 'node-1',
        label: 'Settings',
        children: [{ id: 'node-2', label: 'Billing', children: [] }],
      },
    ],
    conditionsEnabled: false,
  },
  scale: {
    title: 'How easy was it to complete the task?',
    description: 'Rate your experience on a scale of 1-5.',
    imageEnabled: false,
    imageUrl: null,
    leftLabel: 'Very hard',
    middleLabel: 'Neutral',
    rightLabel: 'Very easy',
    numberOfSteps: 5,
    startAtOne: true,
    scaleType: 'numerical',
    conditionsEnabled: false,
  },
  yesno: {
    title: 'Do you recall seeing any way to filter by price?',
    description: 'Use your first initial thought, there is no right or wrong answer.',
    imageEnabled: false,
    imageUrl: null,
    responseType: 'icons',
    conditionsEnabled: false,
  },
  input: {
    title: 'What would you improve?',
    description: 'Share any feedback about the experience.',
    imageEnabled: false,
    imageUrl: null,
    conversationalEnabled: false,
    followUpQuestions: '',
    moderatorInstructions: '',
    conditionsEnabled: false,
  },
  simple_input: {
    title: "What's your email?",
    description: "We'd like to be able to reach out for follow-ups.",
    imageEnabled: false,
    imageUrl: null,
    inputType: 'email',
    conditionsEnabled: false,
  },
  thankyou: {
    title: 'Thank you!',
    description: 'Your feedback helps us build better products.',
  },
};

let blockIdCounter = 1000;

/**
 * Creates a new block with all required fields for its type.
 * @param {string} type - Block type key
 * @returns {Object|null} Block object
 */
export function createBlock(type) {
  const defaults = BLOCK_DEFAULTS[type];
  if (!defaults) {
    console.warn(`Unknown block type: ${type}`);
    return null;
  }
  blockIdCounter += 1;
  return {
    id: `${type}-${blockIdCounter}`,
    type,
    ...defaults,
  };
}

/**
 * Use cases bundle study metadata with a block configuration.
 */
export const USE_CASES = {
  summit_gear_purchase: {
    id: 'summit_gear_purchase',
    name: 'SummitGear Purchase Flow',
    description: 'Usability test for outdoor clothing e-commerce purchase flow',
    studyMeta: {
      name: 'SummitGear Website Usability Test',
      deviceTypes: ['desktop'],
      recordAudio: true,
    },
    blocks: [
      // =====================
      // WELCOME & INTRO
      // =====================
      {
        ...createBlock('welcome'),
        isFixed: true,
        title: 'Welcome to our SummitGear usability study',
        description:
          "Thanks for helping us improve SummitGear's shopping experience! You'll complete 3 short tasks on our outdoor clothing website. There are no right or wrong answers — we're testing the website, not you. This should take about 10 minutes.",
      },
      {
        ...createBlock('context'),
        groupId: 'ai-moderated-1',
        title: 'Your scenario',
        description:
          "Imagine you're planning a hiking trip in the mountains and need a new waterproof jacket. You've heard good things about SummitGear and decided to check out their website.",
      },

      // =====================
      // TASK 1: FIND A PRODUCT
      // =====================
      {
        ...createBlock('mission'),
        groupId: 'ai-moderated-1',
        title: 'Find a waterproof hiking jacket',
        description:
          "Browse the SummitGear website and find a waterproof jacket that would be suitable for mountain hiking. When you've found one you like, click on it to view the product details page.",
        hasPrototype: true,
        prototypeUrl: 'https://summitgear.example.com',
      },
      {
        ...createBlock('scale'),
        groupId: 'ai-moderated-1',
        title: 'How easy was it to find a suitable jacket?',
        description: 'Rate your experience searching for the product.',
        leftLabel: 'Very difficult',
        middleLabel: 'Neutral',
        rightLabel: 'Very easy',
        numberOfSteps: 7,
        startAtOne: true,
        scaleType: 'numerical',
      },
      {
        ...createBlock('yesno'),
        groupId: 'ai-moderated-1',
        title: 'Did you use the filter or sort options?',
        description: 'Think about whether you narrowed down results using any filtering tools.',
        responseType: 'icons',
      },
      {
        ...createBlock('multiple_choice'),
        groupId: 'ai-moderated-1',
        title: 'What helped you find the right product?',
        description: 'Select all that apply.',
        selectType: 'multi',
        shuffleEnabled: true,
        choices: [
          'Category navigation',
          'Search bar',
          'Filter options (waterproof, size, etc.)',
          'Product images',
          'Product descriptions',
          'Customer reviews',
          'Price sorting',
        ],
        otherOptionEnabled: true,
      },
      {
        ...createBlock('input'),
        groupId: 'ai-moderated-1',
        title: 'What would make finding products easier?',
        description: 'Share any suggestions for improving the product discovery experience.',
      },

      // =====================
      // TASK 2: ADD TO BASKET
      // =====================
      {
        ...createBlock('context'),
        title: 'Next: Add to your basket',
        description:
          "Great job finding a jacket! Now let's see how easy it is to add it to your shopping basket.",
      },
      {
        ...createBlock('mission'),
        title: 'Add the jacket to your basket',
        description:
          'Select size Medium and your preferred color, then add the jacket to your basket. Confirm you can see the item in your basket before continuing.',
        hasPrototype: true,
        prototypeUrl: 'https://summitgear.example.com/product/alpine-pro-jacket',
      },
      {
        ...createBlock('scale'),
        title: 'How confident are you the correct item is in your basket?',
        description: 'Consider size, color, and quantity.',
        leftLabel: 'Not confident',
        middleLabel: 'Somewhat confident',
        rightLabel: 'Very confident',
        numberOfSteps: 5,
        startAtOne: true,
        scaleType: 'numerical',
      },
      {
        ...createBlock('yesno'),
        title: 'Was it clear how to select your size?',
        description: 'Think about whether the size selection was obvious and easy to use.',
        responseType: 'icons',
      },
      {
        ...createBlock('multiple_choice'),
        title: 'Did you encounter any issues adding to basket?',
        description: 'Select all that apply, or select "No issues" if everything went smoothly.',
        selectType: 'multi',
        shuffleEnabled: true,
        choices: [
          'No issues',
          "Couldn't find the Add to Basket button",
          'Size options were confusing',
          'Color selection was unclear',
          "Wasn't sure if item was added",
          'Page loaded slowly',
          'Had to scroll too much',
        ],
        otherOptionEnabled: true,
      },

      // =====================
      // TASK 3: COMPLETE PURCHASE
      // =====================
      {
        ...createBlock('context'),
        title: 'Final task: Checkout',
        description:
          "You're almost done! For this last task, we'd like you to go through the checkout process. You can use fake details — this is just a test, no real purchase will be made.",
      },
      {
        ...createBlock('mission'),
        title: 'Complete the checkout process',
        description:
          "Proceed to checkout and complete all the steps as if you were making a real purchase. Use any fake details you like (e.g., test@example.com, fake address). Stop when you reach the final confirmation page.",
        hasPrototype: true,
        prototypeUrl: 'https://summitgear.example.com/basket',
      },
      {
        ...createBlock('scale'),
        title: 'How easy was the overall checkout process?',
        description: 'Rate your experience from start to finish.',
        leftLabel: 'Very difficult',
        middleLabel: 'Neutral',
        rightLabel: 'Very easy',
        numberOfSteps: 7,
        startAtOne: true,
        scaleType: 'numerical',
      },
      {
        ...createBlock('yesno'),
        title: 'Would you feel comfortable making a real purchase on this site?',
        description: 'Based on what you experienced, would you trust this checkout process?',
        responseType: 'icons',
      },
      {
        ...createBlock('multiple_choice'),
        title: 'Which payment methods would you expect to see?',
        description: 'Select all that you would typically look for.',
        selectType: 'multi',
        shuffleEnabled: false,
        choices: [
          'Credit/Debit card',
          'PayPal',
          'Apple Pay',
          'Google Pay',
          'Klarna/Buy now, pay later',
          'Bank transfer',
        ],
        otherOptionEnabled: true,
      },
      {
        ...createBlock('multiple_choice'),
        title: 'What was most frustrating about checkout?',
        description: 'Select all that apply, or "Nothing" if checkout was smooth.',
        selectType: 'multi',
        shuffleEnabled: true,
        choices: [
          'Nothing — it was smooth',
          'Too many form fields',
          'Had to create an account',
          'Shipping options were confusing',
          'Delivery costs were unclear',
          'Payment options were limited',
          'Process felt too long',
          "Couldn't easily edit my basket",
        ],
        otherOptionEnabled: true,
      },
      {
        ...createBlock('input'),
        title: 'Any other feedback on the checkout experience?',
        description:
          'Share anything else you noticed — good or bad — about completing your purchase.',
      },

      // =====================
      // WRAP UP
      // =====================
      {
        ...createBlock('scale'),
        title: 'Overall, how would you rate the SummitGear shopping experience?',
        description: 'Think about the entire journey from finding the product to checkout.',
        leftLabel: 'Poor',
        middleLabel: 'Average',
        rightLabel: 'Excellent',
        numberOfSteps: 5,
        startAtOne: true,
        scaleType: 'stars',
      },
      {
        ...createBlock('input'),
        title: 'Is there anything else you would like to share?',
        description: 'Any final thoughts, suggestions, or observations about your experience.',
      },
      {
        ...createBlock('thankyou'),
        isFixed: true,
        title: 'Thank you for your time!',
        description:
          "Your feedback will help SummitGear create a better shopping experience. If you have any questions, contact us at research@summitgear.example.com",
      },
    ],
  },
};

export const DEFAULT_USE_CASE = 'summit_gear_purchase';
