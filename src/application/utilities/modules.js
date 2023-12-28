import { Branches, CreatePurchase, CreateSelling, Customers, Profile, Providers, Sellings, Stock, ProductTypes, Products, Purchases, Users } from '../pages';

export const modules = {
    Sucursales: Branches,
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