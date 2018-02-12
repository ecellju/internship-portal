const fields = ['id', 'name', 'isAdmin', 'isSuperAdmin'];
class User {
  static create(userDetails) {
    fields.forEach((field) => {
      localStorage.setItem(field, JSON.stringify(userDetails[field]));
    });
  }

  static getId() {
    return JSON.parse(localStorage.getItem('id'));
  }

  static getName() {
    return JSON.parse(localStorage.getItem('name'));
  }

  static isAdmin() {
    return JSON.parse(localStorage.getItem('isAdmin')) || JSON.parse(localStorage.getItem('isSuperAdmin'));
  }

  static isSuperAdmin() {
    return JSON.parse(localStorage.getItem('isSuperAdmin'));
  }

  static clear() {
    fields.forEach((field) => {
      localStorage.removeItem(field);
    });
  }
}

export default User;
