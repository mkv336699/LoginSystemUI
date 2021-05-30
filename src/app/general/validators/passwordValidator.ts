import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export class PasswordValidators {
    static requiredLength(control: AbstractControl): ValidationErrors | null {
        if (control.value && ((control.value as string).length < 8 || (control.value as string).length > 32)) {
            return { requiredLength: true };
        }
        return null;
    }

    static matchPasswords(group: FormGroup): ValidationErrors | null {
        const password = group.controls.password.value;
        const verifyPassword = group.controls.verifyPassword.value;
        if (password !== verifyPassword) {
            return { matchPasswords: true };
        }
        return null;
    }
}
