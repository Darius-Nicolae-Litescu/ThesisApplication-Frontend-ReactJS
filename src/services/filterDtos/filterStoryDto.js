export default class FilterStoryDto {
    constructor(title, description, category, priorityId, priorityTitle, priorityDescription, priorityLevel, softwareApplicationName, softwareApplicationDescription) {
      this.title = title;
      this.description = description;
      this.category = category;
      this.priorityId = priorityId;
      this.priorityTitle = priorityTitle;
      this.priorityDescription = priorityDescription;
      this.priorityLevel = priorityLevel;
      this.softwareApplicationName = softwareApplicationName;
      this.softwareApplicationDescription = softwareApplicationDescription;
    }
  }
  