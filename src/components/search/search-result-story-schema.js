export const storySchema = {
    title: "Story filter",
    description: "Filter possible Story details",
    type: "object",
    properties: {
      title: {
        type: "string",
        title: "Title"
      },
      description: {
        type: "string",
        title: "Description"
      },
      category: {
        type: "string",
        title: "Category"
      },
      priorityTitle: {
        type: "string",
        title: "Priority Title"
      },
      priorityDescription: {
        type: "string",
        title: "Priority Description"
      },
      priorityLevel: {
        type: "number",
        title: "Priority Level"
      },
      softwareApplicationName: {
        type: "string",
        title: "Software Application Name"
      },
      softwareApplicationDescription: {
        type: "string",
        title: "Software Application Description"
      }
    }
  };