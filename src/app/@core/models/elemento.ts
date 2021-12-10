export class Elemento{
    Id: string;
    FechaRegistro: Date;
    Descripcion: string;
    TipoBien: string;
    Cantidad: number;
    Unidad: string;
    Valor: number;
    Iva: string;
    Subtotal: number;
    TotalIva: number;
    TotalConIva: number;
    Entrada: number;
    CuentaEntrada:number;
    Salida: number;
    CuentaSalida: number;
    FechaSalida: Date;
    VidaUtil: number;
    Depreciacion:number;
    NuevaFechaSalida: Date;
    NuevoValor: number;
    NuevaVidaUtil: number;
    NuevoValorResidual:number;
    DepreciacionMes: number;
    DepreciacionAcumulada:number;
    Placa:string;
  }