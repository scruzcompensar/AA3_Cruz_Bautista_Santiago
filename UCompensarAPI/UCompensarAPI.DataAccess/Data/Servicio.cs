using System;
using System.Collections.Generic;

namespace UCompensarAPI.DataAccess.Data;

public partial class Servicio
{
    public string FechaInicio { get; set; } = null!;

    public string FechaFin { get; set; } = null!;

    public int TarifaFin { get; set; }

    public string Estado { get; set; } = null!;

    public int IdTipoServicio { get; set; }

    public int IdServicio { get; set; }

    public int IdUsuario { get; set; }

    public virtual TipoServicio IdTipoServicioNavigation { get; set; } = null!;

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
