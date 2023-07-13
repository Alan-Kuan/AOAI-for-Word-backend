# Azure OpenAI for Word (Backend)
This is the backend of the Office Add-in, [Azure OpenAI for Word](https://github.com/Alan-Kuan/AOAI-for-Word).

## Production Environment Setup
1. Register application on Azure.
    1. Search for "App registrations"  
    ![app registration.png](https://github.com/Alan-Kuan/AOAI-for-Word-backend/assets/24734750/553736af-cefe-4c24-8d7b-41eabe916a5b)
    2. Click "New Registration".  
    ![new registration.png](https://github.com/Alan-Kuan/AOAI-for-Word-backend/assets/24734750/6ed74ff4-f9cc-4603-a901-998577af84e3)
    3. Register an application for this add-in.  
    ![register an application.png](https://github.com/Alan-Kuan/AOAI-for-Word-backend/assets/24734750/89c6190e-733c-4114-a2d2-9a464b346df3)
2. Deploy to Azure App Services.
    1. Search for "App Services"  
    ![app services.png](https://github.com/Alan-Kuan/AOAI-for-Word-backend/assets/24734750/7812109e-70a8-44c7-8eb4-a45c47c75300)
    2. Click "Create".  
    ![create.png](https://github.com/Alan-Kuan/AOAI-for-Word-backend/assets/24734750/fc51e95a-d1cc-47f5-9482-e40ea26f5bc5)
    3. Create a web app.  
    Select your resource group and choose a unique name for your app.  
    ![create a web app - basic.png](https://github.com/Alan-Kuan/AOAI-for-Word-backend/assets/24734750/ec183390-2d1f-44ec-896c-4e48bc35e64a)
    ![create a web app - docker.png](https://github.com/Alan-Kuan/AOAI-for-Word-backend/assets/24734750/a6b2f256-d92a-4842-8321-f2a558cc92cd)
    4. Configure environment variables.  
    After deployed, go to its configuration section on the sidebar, and set the following environment variables.
        - `AZ_APP_ID`: the ID of the application we just register
        - `CLIENT_ID`: same as previous variable
        - `AUTHORITY`: `https://login.microsoftonline.com/<tenant ID>`
        - `REDIRECT_URI`: the value that we will fill in at the next step
4. Add Redirect URI  
    Go to the page of the application we just registered.
    The hostname in the URI should be the one provided by App Service we create in previous step.
    Besides, remember to make it issue both ID token and access token.
    ![configuration.png](https://github.com/Alan-Kuan/AOAI-for-Word-backend/assets/24734750/9ae4a8b5-a910-4a82-b254-852ff22f0a91)
