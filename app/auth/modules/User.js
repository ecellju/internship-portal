class User {
  static create(id, name = '', isAdmin = false) {
    localStorage.setItem('id', JSON.stringify(id));
    localStorage.setItem('name', JSON.stringify(name));
    localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
  }

  static getId() {
    return JSON.parse(localStorage.getItem('id'));
  }

  static getName() {
    return JSON.parse(localStorage.getItem('name'));
  }

  static isAdmin() {
    return JSON.parse(localStorage.getItem('isAdmin'));
  }

  static clear() {
    localStorage.removeItem('name');
    localStorage.removeItem('isAdmin');
  }
}

export default User;
