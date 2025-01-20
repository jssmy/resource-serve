/**
 *DOCS: https://www.npmjs.com/package/generate-password-ts
 * 
 */

 import * as generator from 'generate-password-ts';

export class Password {

    generate() {
        return generator.generate(
            {
                length: 12,
                numbers: true,
                symbols: '[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]123456789',
            }
        );
    }

}



