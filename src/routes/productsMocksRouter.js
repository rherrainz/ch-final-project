import {Router} from 'express';
import { fakeProducts } from '../utils/mocks.js';

const router = Router();

router.get('/', (req, res) => {
    let products = [];
    try{
        for(let i=0;i<100;i++)
        {const product = fakeProducts();
        products.push(product);
    }
    res.json({message:'productos generados',products});

    }catch(error){
        console.log(error);
    }

});

export default router;