import {Resolver} from 'type-graphql';
import { Product } from '../../entities/Product';
import { CreateProductInput } from './create/CreateProductInput';
import { createBaseResolver } from '../createBaseResolver';


const BaseCreateProduct = createBaseResolver("Product", Product, CreateProductInput, Product);

@Resolver()
export class CreateProductResolver extends BaseCreateProduct { }