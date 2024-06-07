# NEXT DESIGN

## Introduction

This is a school project for the Frontend course at Medieinstitutet Göteborg. The objective of this project is to create a fully functional web shop using React, NextJS, TypeScript, and ChakraUI as our design system. The design and color theme of `NEXT DESIGN` are inspired by the existing interior store `NORDIC NEST`.

## Description

According to the project requirements, the web shop must consist of at least four pages: a home page, a product page, a checkout page, and a confirmation page.

### Home Page

The home page displays all available products categories. Users can click on a category to navigate to the products page.

### Product Page

On the product page, users can read the description of the selected product and add it to their shopping cart. If the product is out of stock then it is not possible to add to cart.

### Checkout Page

The checkout page is divided into two main sections:

#### Shopping Cart

- Lists added products with their image, title, quantity, and price.
- Displays the total price of the cart.
- Allows users to update the cart by changing the quantity or removing products.

#### Delivery Information

- Users must be logged in to view and fill out the delivery information form.
- The form includes fields for name, email, phone number, and address.
- The form fields are automatically populated where possible for convenience.

### Confirmation Page

Once the user has completed the checkout process, the confirmation page displays a confirmation message along with a unique order number.

### Admin-page

- Add / edit / delete products
- See all orders
- Add categorys
- Change state of order to sent status.

# The backend

The project databaseis configured through Neon using Prisma to create a schema and populate database which is cloudbased PostgeSql.

# Assignment requirements

- [x] Arbetet ska implementeras med NextJS. (G)
- [x] Beskriv er företagsidé i en kort textuell presentation, detta ska ha visats vid idégodkännandet (G)
- [x] Skapa ett ER diagram som ska ha visats vid idégodkännandet (G)

- [x] När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är skickade eller inte (G)
- [x] Backenden ska ha validering på samtliga endpoints (även Server Actions). (G)
  - Auth.js used to validate the user when doing actions.
- [x] Alla Sidor ska vara responsiva
  - Used chakra template with incorpriated responsivity.
- [x] Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält (G)
  - Validation with FORMIK + YUP
- [x] Administratörer ska kunna markera beställningar som skickade (G)
- [x] Administratörer ska kunna lägga till och ta bort produkter (G)
- [x] Administratörer ska kunna redigera produkt (G)
- [x] En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan beställningen skapas (G)
  - Used Auth.js to use Oauth through GitHub.
- [x] Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på klienten (G)
- [x] Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori (G)
- [x] Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera (G)
- [x] Administratörer ska kunna se en lista på alla gjorda beställningar (G)
- [x] Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan (G)
- [x] En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen (G)
- [x] Inga Lösenord får sparas i klartext i databasen (G)
  - Auth.js used, does not require any password / credentials
- [x] Man ska kunna logga in som administratör i systemet (G)
  - Based on a isAdmin boolean within user-model.
- [x] All data som programmet utnyttjar ska vara sparat i en SQL databas (produkter, beställningar, konton, mm) med undantaget av bilder. (G)
  - Using cloudbased postgresql hosted on Neon.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Eleni001/netio.git
   cd netio
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Run the development server:**

   ```sh
   npm run dev
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:5173
   ```

## Design System

The web shop utilizes ChakraUI for its design system, providing a consistent and responsive design. ChakraUI components ensure a cohesive look and feel across all pages.

## Contributors

This project was created by Eleni, Igor Pieropan, Tomoyo, Nathalie and Oscar who are FED23G students.
