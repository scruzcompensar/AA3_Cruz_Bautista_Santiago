namespace UCompensarAPI.Common.DTOS
{
    public class UsuarioDTO
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
    }

}
