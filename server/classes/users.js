class Users {
  constructor() {
    this.people = [];
  }

  addPerson( id, name, room ) {
    let person = {id, name, room};
    this.people.push(person);
    return this.people
  }

  getPerson(id) {
    return this.people.filter(person => person.id === id)[0];
  }

  getPeople() {
    return this.people;
  }

  getPeopleByRoom(room) {
    let peopleOnRoom = this.people.filter(persona => persona.room === room);
    return peopleOnRoom;
  }

  removePerson(id) {
    const removedPerson = this.getPerson(id);
    this.people = this.people.filter( person => person.id !== id);
    return removedPerson;
  }
}

module.exports = {
  Users
}