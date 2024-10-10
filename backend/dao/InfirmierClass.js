class InfirmierClass {
    constructor(userId) {
        this.userId = userId
        this.specialite = []
        this.langueparlee = []
    }

    constructor(userId, specialite, langueparlee) {
        this.userId = userId
        this.specialite = specialite
        this.langueparlee = langueparlee
    }

    get userId() {
        return this._userId;
    }
    set userId(userId) {
        this._userId = userId;
    }
    get specialite() {
        return this._specialite;
    }
    set specialite(specialite) {
        this._specialite = specialite;
    }
    get langueparlee() {
        return this._langueparlee;
    }
    set langueparlee(langueparlee) {
        this._langueparlee = langueparlee;
    }

    
    
  }