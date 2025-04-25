export interface CrearPolizaRequest {
    idPoliza?: number;
    numeroPoliza: string;
    cedulaAsegurado: string;
    idTipoPoliza: number;
    idEstadoPoliza: number;
    idCobertura: number;
    montoAsegurado: number;
    fechaVencimiento: string;
    fechaEmision: string;
    fechaInclusion: string;
    periodo: string;
    prima: number;
    aseguradora: string;
  }
  