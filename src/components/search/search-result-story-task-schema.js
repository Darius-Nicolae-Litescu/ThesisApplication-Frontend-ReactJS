export const storyTaskSchema = {
  title: "Story Task filter",
  description: "Filter possible Story task details",
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
    storyPoints: {
      type: "number",
      title: "Story points"
    },
    createdByUsername: {
      type: "string",
      title: "Created by"
    },
    assignedToUsername: {
      type: "string",
      title: "Assigned to"
    },
    status: {
      type: "string",
      title: "Status"
    }
  }
};