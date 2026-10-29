/** A client-facing approach, not a claim that a particular engagement has already shipped. */
export const processStory = [
  {
    id: "discover",
    title: "Understand",
    label: "START WITH YOUR PROBLEM",
    question: "What’s getting in the way?",
    approach:
      "We start with a conversation about your idea, the people it affects and how things work today. I ask questions, listen to what is frustrating, and help separate the real problem from its symptoms.",
    result:
      "We agree on what needs to change and what a useful result would look like for you.",
    deliverable: "A clear problem, the people we’re helping, and agreed goals.",
  },
  {
    id: "architect",
    title: "Plan",
    label: "TURN THE IDEA INTO A CLEAR DIRECTION",
    question: "What should we solve first?",
    approach:
      "I turn the raw idea into a simple plan: what the solution should do, how people will use it, and which features matter most. We agree on a realistic first version, the scope and the delivery steps before building.",
    result:
      "You know what we are creating, why it matters, and how we will get there.",
    deliverable:
      "A practical plan, clear priorities, and an agreed scope and timeline.",
  },
  {
    id: "build",
    title: "Create",
    label: "MAKE SOMETHING YOU CAN USE",
    question: "How do we turn the plan into something real?",
    approach:
      "I build the solution in manageable steps and show you working progress early. You can try it, ask questions and give feedback while there is still room to make changes.",
    result:
      "Your idea becomes a working tool shaped around how you and your customers actually work.",
    deliverable:
      "A usable version you can try, with regular demonstrations and feedback.",
  },
  {
    id: "secure",
    title: "Protect",
    label: "LOOK AFTER PEOPLE AND INFORMATION",
    question: "Who should have access to what?",
    approach:
      "We consider the information the solution will handle and who needs to use it. I build in appropriate access rules and safeguards, so protecting customer and business information is part of the work from the beginning.",
    result:
      "People can do their jobs with access appropriate to their role, and sensitive information is handled thoughtfully.",
    deliverable:
      "Clear access rules and safeguards appropriate to the solution.",
  },
  {
    id: "test",
    title: "Check",
    label: "TRY THE EVERYDAY TASKS",
    question: "Does it work for the people who need it?",
    approach:
      "We walk through real tasks together, including the awkward situations: missing information, mistakes, small screens and repeated actions. I resolve confusing steps and issues before the solution is put into everyday use.",
    result:
      "You can see that the solution addresses the original problem, rather than just looking finished.",
    deliverable:
      "Checked workflows, resolved issues, and a solution reviewed against your goals.",
  },
  {
    id: "deploy",
    title: "Launch",
    label: "PUT THE SOLUTION TO WORK",
    question: "How do we start using it with confidence?",
    approach:
      "I prepare the solution for its intended environment, help you get started, and explain how the important parts work. The handover includes useful guidance, ownership details and agreed next steps for support.",
    result:
      "You have a clear path from trying the solution to using it in your day-to-day work.",
    deliverable:
      "A launch plan, a practical handover, and guidance for the people using it.",
  },
  {
    id: "improve",
    title: "Improve",
    label: "KEEP MAKING THE WORK SIMPLER",
    question: "How can this work even better?",
    approach:
      "Once people start using the solution, we listen to their feedback and look for remaining friction. As your needs change, I help prioritize useful improvements instead of adding features that make the work more complicated.",
    result:
      "The solution can grow with your business and keep making everyday work simpler.",
    deliverable:
      "A focused list of improvements based on real feedback and changing needs.",
  },
] as const;
