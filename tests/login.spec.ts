import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPages';
import TestData from '../data/testData.json'
import { DashboardPage } from '../pages/dashboardPage';

let loginPage: LoginPage;
let dashboardPage: DashboardPage

test.beforeEach (async({page}) =>{
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page)
    await loginPage.visitarPaginaLogin();
})

test ('TC-7 verificar inicio de login exitoso', async({page}) =>{
    await loginPage.completarYhacerClickLogin(TestData.usuarioValido)
    await expect(page.getByText('Inicio de sesión exitoso')).toBeVisible();
    await page.waitForTimeout(10000)
    await expect (dashboardPage.dashboardTitle).toBeVisible();
    
} )
