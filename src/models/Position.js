class Position {
    #id = 0;
    #name = null;
    #seniorityLevel = null;
    constructor(id, name, seniorityLevel) {
        this.id = id;
        this.name = name;
        this.seniorityLevel = seniorityLevel;
    }
    constructor(name, seniorityLevel) {
        this.name = name;
        this.seniorityLevel = seniorityLevel;
    }
}
export default Position;
