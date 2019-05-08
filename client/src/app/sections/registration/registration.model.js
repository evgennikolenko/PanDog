"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class RegistrationFormControl extends forms_1.FormControl {
    constructor(label, property, value, validator) {
        super(value, validator);
        this.label = label;
        this.property = property;
    }
    getValidationMessages() {
        let messages = [];
        if (this.errors) {
            for (let err in this.errors) {
                switch (err) {
                    case "required":
                        messages.push(`Enter ${this.property}`);
                        break;
                    case "minlength":
                        messages.push(`A ${this.label} must be at least
                        ${this.errors['minlength'].requiredLength}
                        characters`);
                        break;
                    case "maxlength":
                        messages.push(`A ${this.label} must be no more than
                        ${this.errors['maxlength'].requiredLength}
                        characters`);
                        break;
                    case "pattern":
                        messages.push(`The ${this.label} contains illegal characters`);
                        break;
                }
            }
        }
        return messages;
    }
}
exports.RegistrationFormControl = RegistrationFormControl;
