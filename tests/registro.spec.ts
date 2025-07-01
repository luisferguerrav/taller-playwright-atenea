import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage';
import TestData from '../data/testData.json'


// COMANDOS: npx playwright test --ui 
 // npx playwright codegen http://localhost:3000/
 // rm -rf test-results

// TODO LO COMENTADO SON LOS PRIMEROS CASOS DE PRUEBA QUE HICE

let registerPage: RegisterPage;

test.beforeEach( async({page}) =>{
  registerPage = new RegisterPage(page);
  await registerPage.visitarPaginaRegistro();
})

test('TC-01 verificacion de elementos visuales en la pagina de registro', async ({ page }) => {

  // PRIMER EJEMPLO DE CASO DE PRUEBA

  // await page.goto('http://localhost:3000/');
  // await expect(page.locator('input[name="firstName"]')).toBeVisible();
  // await expect(page.locator('input[name="lastName"]')).toBeVisible();
  // await expect(page.locator('input[name="email"]')).toBeVisible();
  // await expect(page.locator('input[name="password"]')).toBeVisible();
  // await expect (page.getByTestId('boton-registrarse')).toBeVisible();

  // const registerPage = new RegisterPage (page);
  // await registerPage.visitarPaginaRegistro();  // sin hooks 

  await expect(registerPage.firtNameImput).toBeVisible();
  await expect(registerPage.lastNameImput).toBeVisible();
  await expect(registerPage.emailImput).toBeVisible();
  await expect(registerPage.passwordImput).toBeVisible();
  await expect(registerPage.registerButton).toBeVisible();

});

test ('TC-02 verificar si el boton de registro esta desavilitado por defecto', async({page}) =>{
  //await page.goto('http://localhost:3000/')
  //await expect (page.getByTestId('boton-registrarse')).toBeDisabled();
  
  // const registerPage = new RegisterPage (page);
  // await registerPage.visitarPaginaRegistro();  // sin hooks 
  
  await expect(registerPage.registerButton).toBeVisible();

})

test('TC-03 verificar que el boton de registro se habilita al completar los campos', async ({page}) =>{
  //await page.goto('http://localhost:3000/')

  // const registerPage = new RegisterPage (page);
  // await registerPage.visitarPaginaRegistro();  // sin hooks 

  // await page.locator('input[name="firstName"]').fill('Luis');
  // await page.locator('input[name="lastName"]').fill('Guerra');
  // await page.locator('input[name="email"]').fill('luisfernadogv@gmail.com');
  // await page.locator('input[name="password"]').fill('123456789');
  // await expect (page.getByTestId('boton-registrarse')).toBeEnabled();
  
  //SEGUDO EJEMPLO CASO DE PRUEBA 
  // await registerPage.firtNameImput.fill('Luis');
  // await registerPage.lastNameImput.fill('Guerra');
  // await registerPage.emailImput.fill('luisfernadogv@gmail.com');
  // await registerPage.passwordImput.fill('123456789');

  // await registerPage.completarFormularioRegistro('luis', 'guerra', 'luisfernadogv@gmail.com', '123456789') //SIN EL JSON
  await registerPage.completarFormularioRegistro(TestData.usuarioValido)
  await expect(registerPage.registerButton).toBeEnabled();
});

test('TC-04 verificar redireccionamiento a la pagina de inicio de sesion', async({page}) =>{
//await page.goto('http://localhost:3000/')

// const registerPage = new RegisterPage (page);
//   await registerPage.visitarPaginaRegistro();  // sin hooks 

//await page.getByTestId('boton-login-header-signup').click()
await registerPage.hacerClickBotonLogin;
//await expect(page).toHaveURL('http://localhost:3000/login')
await page.waitForTimeout(5000)
});


test ('TC-05 resgistro exitoso con datos validos', async ({page}) =>{
  
  //await page.goto('http://localhost:3000/')
  
  //const registerPage = new RegisterPage (page);
  //await registerPage.visitarPaginaRegistro();  //sin hooks 
  
  // await page.locator('input[name="firstName"]').fill('Luis');
  // await page.locator('input[name="lastName"]').fill('Guerra');
  // await page.locator('input[name="email"]').fill('luisfernado' +Date.now().toString()+ '@gmail.com');
  // await page.locator('input[name="password"]').fill('123456789');
  // await page.getByTestId('boton-registrarse').click();
  // await expect(page.getByText('Registro exitoso!')).toBeVisible({timeout:10000});
  
  //SEGUNDO EJEMPLO CASO DE PRUEBA
  
  // await registerPage.firtNameImput.fill('luis');
  // await registerPage.lastNameImput.fill('Guerra');
  // await registerPage.emailImput.fill('luisfernado' + Date.now().toString() + '@gmail.com');
  // await registerPage.passwordImput.fill('123456789');
  // await registerPage.registerButton.click();
  
  //await registerPage.completarYhacerClickBotonRegistro('luis', 'guerra', 'luisfernado' + Date.now().toString() + '@gmail.com', '123456789')

  await test.step('completar formulario con datos correctos', async () =>{
    const email = (TestData.usuarioValido.email.split('@')[0] + Date.now().toString() + '@' + TestData.usuarioValido.email.split('@')[1]);
    TestData.usuarioValido.email = email;
    await registerPage.completarYhacerClickBotonRegistro(TestData.usuarioValido)
  
  })
  await expect(page.getByText('Registro exitoso!')).toBeVisible({timeout:10000});
});

test ('TC-6 verificar que el usiario no pueda registrarse con email ya existente', async({page}) =>{
  const email = (TestData.usuarioValido.email.split('@') [0] + Date.now().toString() + '@' + TestData.usuarioValido.email.split ('@')[1])
  TestData.usuarioValido.email = email;
  //await page.goto('http://localhost:3000/')

  // const registerPage = new RegisterPage (page);
  // await registerPage.visitarPaginaRegistro(); //sin hoooks 

//   await page.locator('input[name="firstName"]').fill('Luis');
//   await page.locator('input[name="lastName"]').fill('Guerra');
//   await page.locator('input[name="email"]').fill(email);
//   await page.locator('input[name="password"]').fill('123456789');
//   await page.getByTestId('boton-registrarse').click();
//   await expect(page.getByText('Registro exitoso!')).toBeVisible({timeout:10000});

  //await page.goto('http://localhost:3000/')
  
  //   await page.locator('input[name="firstName"]').fill('Luis');
  //   await page.locator('input[name="lastName"]').fill('Guerra');
  //   await page.locator('input[name="email"]').fill(email);
  //   await page.locator('input[name="password"]').fill('123456789');
  //   await page.getByTestId('boton-registrarse').click();
  //   await expect(page.getByText('Email already in use ')).toBeVisible({timeout:10000});
  //   await expect(page.getByText('Registro exitoso!')).not.toBeVisible({timeout:10000});

    //SEGUNDO EJEMPLO CASO DE PRUEBA 

  // await registerPage.firtNameImput.fill('luis');
  // await registerPage.lastNameImput.fill('Guerra');
  // await registerPage.emailImput.fill(email);
  // await registerPage.passwordImput.fill('123456789');
  // await registerPage.registerButton.click();
  // await expect(page.getByText('Registro exitoso!')).toBeVisible({timeout:10000});
  
  // await registerPage.visitarPaginaRegistro();
  
  // await registerPage.firtNameImput.fill('luis');
  // await registerPage.lastNameImput.fill('Guerra');
  // await registerPage.emailImput.fill(email);
  // await registerPage.passwordImput.fill('123456789');
  // await registerPage.registerButton.click();
  // await expect(page.getByText('Email already in use ')).toBeVisible({timeout:10000});
  // await expect(page.getByText('Registro exitoso!')).not.toBeVisible({timeout:10000});

  await registerPage.completarYhacerClickBotonRegistro(TestData.usuarioValido)
  await expect(page.getByText('Registro exitoso!')).toBeVisible({timeout:10000});

  await registerPage.visitarPaginaRegistro()

  await registerPage.completarYhacerClickBotonRegistro(TestData.usuarioValido)
  await expect(page.getByText('Email already in use ')).toBeVisible({timeout:10000});
  await expect(page.getByText('Registro exitoso!')).not.toBeVisible({timeout:10000});


 })

 