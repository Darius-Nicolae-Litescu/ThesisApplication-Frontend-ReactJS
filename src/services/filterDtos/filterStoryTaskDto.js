export default class FilterStoryTaskDto {
  constructor(title, description, storyPoints, createdByUsername, assignedToUsername, status) {
    this.title = title;
    this.description = description;
    this.storyPoints = storyPoints;
    this.createdByUsername = createdByUsername;
    this.assignedToUsername = assignedToUsername;
    this.status = status;
  }
}
