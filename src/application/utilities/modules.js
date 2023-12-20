import { Home, Brands, CreatePurchase, CreateSelling, Customers, Profile, Providers, Sellings, Stock, ProductTypes, Products, Purchases, Users } from '../pages/index';

export const modules = {
    Sucursales: Brands,
    Usuarios: Users,
    Perfil: Profile,
    Proveedores: Providers,
    TiposDeProductos: ProductTypes,
    Productos: Products,
    Stock: Stock,
    Compras: Purchases,
    Clientes: Customers,
    CrearCompra: CreatePurchase,
    CrearVenta: CreateSelling,
    Ventas: Sellings
}