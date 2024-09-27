using System;
using System.Collections.Generic;

namespace UCompensarAPI.DataAccess.Data;

public partial class Usuario
{
    public int IdUsuario { get; set; }

    public string NombreUsuario { get; set; } = null!;

    public string ApellidosUsuario { get; set; } = null!;

    public string IdentificacionUsuario { get; set; } = null!;

    public string TelefonoUsuario { get; set; } = null!;

    public string DireccionUsuario { get; set; } = null!;

    public string CorreoUsuario { get; set; } = null!;

    public string ContraseñaUsuario { get; set; } = null!;

    public string Role { get; set; } = null!;

    public virtual ICollection<Servicio> Servicios { get; set; } = new List<Servicio>();
}
