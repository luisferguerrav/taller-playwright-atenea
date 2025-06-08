import { test, expect } from '@playwright/test';

test('TC-01 verificacion de elementos visuales en la pagina de registro', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.locator('input[name="firstName"]')).toBeVisible();
  await expect(page.locator('input[name="lastName"]')).toBeVisible();
  await expect(page.locator('input[name="email"]')).toBeVisible();
  await expect(page.locator('input[name="password"]')).toBeVisible();
  await expect (page.getByTestId('boton-registrarse')).toBeVisible();
  

});

test ('TC-02 verificar si el boton de registro esta desavilitado por defecto', async({page}) =>{
  await page.goto('http://localhost:3000/')
  await expect (page.getByTestId('boton-registrarse')).toBeDisabled();
})

test('TC-03 verificar que el boton de registro se habilita al completar los campos', async ({page}) =>{
  await page.goto('http://localhost:3000/')
  await page.locator('input[name="firstName"]').fill('Luis');
  await page.locator('input[name="lastName"]').fill('Guerra');
  await page.locator('input[name="email"]').fill('luisfernadogv@gmail.com');
  await page.locator('input[name="password"]').fill('123456789');
  await expect (page.getByTestId('boton-registrarse')).toBeEnabled();
});

test('TC-04 verificar redireccionamiento a la pagina de inicio de sesion', async({page}) =>{
await page.goto('http://localhost:3000/')
await page.getByTestId('boton-login-header-signup').click()
await expect(page).toHaveURL('http://localhost:3000/login')
await page.waitForTimeout(5000)
});


test ('TC-05 resgistro exitoso con datos validos', async ({page}) =>{
  await page.goto('http://localhost:3000/')
  await page.locator('input[name="firstName"]').fill('Luis');
  await page.locator('input[name="lastName"]').fill('Guerra');
  await page.locator('input[name="email"]').fill('luisfernado' +Date.now().toString()+ '@gmail.com');
  await page.locator('input[name="password"]').fill('123456789');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Registro exitoso!')).toBeVisible({timeout:10000});
});

test ('TC-6 verificar que el usiario no pueda registrarse con email ya existente', async({page}) =>{
  const email = 'luisfernado' +Date.now().toString()+ '@gmail.com';
  
  await page.goto('http://localhost:3000/')
  await page.locator('input[name="firstName"]').fill('Luis');
  await page.locator('input[name="lastName"]').fill('Guerra');
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill('123456789');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Registro exitoso!')).toBeVisible({timeout:10000});

  await page.goto('http://localhost:3000/')
  await page.locator('input[name="firstName"]').fill('Luis');
  await page.locator('input[name="lastName"]').fill('Guerra');
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill('123456789');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Email already in use ')).toBeVisible({timeout:10000});
  await expect(page.getByText('Registro exitoso!')).not.toBeVisible({timeout:10000});
})