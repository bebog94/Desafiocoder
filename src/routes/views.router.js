import { Router } from "express";
import { productsManager } from "../DAL/dao/managers/productsManager.js";
import { cartsManager } from "../DAL/dao/managers/cartsManager.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/login", (req, res) => {
  if (req.session.user) {
    return res.redirect("/profile");
  }

  res.render("login");
});

router.get("/signup", async (req, res) => {
  if (req.session.user) {
    return res.redirect("/profile");
  }
  res.render("signup");
});

router.get("/profile", async (req, res) => {
  if (!req.session.passport) {
    return res.redirect("/login");
  }
  try {
    const user = req.session.passport;

    const products = await productsManager.findAll({
      page: 1, 
      limit: 10, 
      sort: null, 
      query: null, 
    });

    // Renderizar la vista "profile" con datos del usuario y productos
   
    res.render("profile", { user, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al cargar la página de perfil' });
  }
});


router.get("/error", (req, res) => {
  const AllMessages = req.session.messages || [];
  const messages = AllMessages.length > 0 ? AllMessages[AllMessages.length - 1] : null;
  console.log('req.session', req.session);
  res.render("error", { messages, style: "error" });
});





  router.get('/chat', authMiddleware(["USER","user"]), (req, res) => {
    res.render('chat'); 
  }); 

   router.get('/products', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sort = req.query.sort || null;
      const query = req.query.query || null;
  
      const products = await productsManager.findAll({
        page,
        limit,
        sort,
        query,
      });
      res.render('products', {products});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }); 

  
  router.get('/products/:id', async (req, res) => {
    const productId = req.params.id;
  
    try {
      const product = await productsManager.findById(productId);
  
      res.render('product-details', { product });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.get('/carts/:id', async (req, res) => {
    const cartId = req.params.id;
  
    try {
      const cart = await cartsManager.findCartById(cartId);
   
      const productsInCart = cart.products; 
  
      res.render('cart-details', { products: productsInCart });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
 
export default router;