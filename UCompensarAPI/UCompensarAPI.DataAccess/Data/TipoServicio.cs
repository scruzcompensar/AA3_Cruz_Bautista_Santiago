using System;
using System.Collections.Generic;

namespace UCompensarAPI.DataAccess.Data;

public partial class TipoServicio
{
    public int IdTipoServicio { get; set; }

    public string NombreServicio { get; set; } = null!;

    public string Descripcion { get; set; } = null!;

    public int TarifaBase { get; set; }

    public virtual ICollection<Servicio> Servicios { get; set; } = new List<Servicio>();
}
