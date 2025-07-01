import {Page, Locator} from '@playwright/test'

export class RegisterPage {
    readonly page: Page;
    readonly firtNameImput: Locator;
    readonly lastNameImput: Locator;
    readonly emailImput: Locator;
    readonly passwordImput: Locator;
    readonly registerButton: Locator;
    readonly loginButton: Locator;

    constructor (page: Page){
        this.page = page;
        this.firtNameImput = page.locator( 'input[name="firstName"]');
        this.lastNameImput = page.locator( 'input[name="lastName"]');
        this.emailImput = page.locator( 'input[name="email"]');
        this.passwordImput = page.locator( 'input[name="password"]');
        this.registerButton = page.getByTestId( 'boton-registrarse');
        this.loginButton = page.getByTestId( 'boton-login-header-signup');
    }

    async visitarPaginaRegistro (){
        await this.page.goto('http://localhost:3000/')
        await this.page.waitForLoadState('networkidle')
    }

    // async completarFormularioRegistro (firstName: string, lastName: string, email: string, password:string){
    //     await this.firtNameImput.fill(firstName);
    //     await this.lastNameImput.fill(lastName);
    //     await this.emailImput.fill(email);
    //     await this.passwordImput.fill(password)

    // }  //EJEMPLO SIN EL JSON 

    async completarFormularioRegistro(usuario:{nombre:string, apellido:string, email: string, password:string}){
        await this.firtNameImput.fill(usuario.nombre);
        await this.lastNameImput.fill(usuario.apellido);
        await this.emailImput.fill(usuario.email);
        await this.passwordImput.fill(usuario.password);
    }

    async hacerClickBotonRegistro (){
        await this.registerButton.click();
    }

    async hacerClickBotonLogin(){
        await this.page.goto('http://localhost:3000/login')
        await this.loginButton.click()
        
    }

    // async completarYhacerClickBotonRegistro (firstName: string, lastName: string, email: string, password: string){
    //     await this.completarFormularioRegistro(firstName, lastName, email, password);
    //     await this.hacerClickBotonRegistro();

    // }  //EJEMPLO SIN EL JSON

    async completarYhacerClickBotonRegistro (usuario:{nombre:string, apellido:string, email:string, password:string}){
        await this.completarFormularioRegistro(usuario);
        await this.hacerClickBotonRegistro();
    }

}
