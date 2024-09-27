namespace UCompensarAPI.Config
{
    public class ApiRoutes
    {
        public const string Root = "api/";

        public static class Usuario
        {
            public const string ObtenerUsuarioId = Root + "usuario/ObtenerPorId{id}";
            public const string ObtenerTodos = Root + "usuario/ObtenerTodos";
            public const string AgregarUsuario = Root + "usuario/AgregarUsuario";
            public const string ModificarUsuario = Root + "usuario/ModificarUsuario";
            public const string EliminarUsuario = Root + "usuario/EliminarUsuario{id}";
        }
    }
}
