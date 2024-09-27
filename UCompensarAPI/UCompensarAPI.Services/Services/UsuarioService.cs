using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UCompensarAPI.Common.DTOS;
using UCompensarAPI.DataAccess.DAO;
using UCompensarAPI.DataAccess.Data;

namespace UCompensarAPI.Services.Services
{
    public interface IUsuarioService
    {
        List<UsuarioDTO> ObtenerTodosUsuario();
        UsuarioDTO ObtenerPorID(int idUsuario);
        UsuarioDTO AgregarUsuario(UsuarioDTO usuarioRequest);
        UsuarioDTO ModificarUsuario(UsuarioDTO usuarioRequest);
        string EliminarUsuario(int idUsuario);
    }
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioDAO _usuarioDAO;
        public UsuarioService(IUsuarioDAO usuarioDAO) 
        {
            _usuarioDAO = usuarioDAO;
        }

        public List<UsuarioDTO> ObtenerTodosUsuario()
        {
            List<UsuarioDTO> usuarioDTOs = new List<UsuarioDTO>();
            var listaUsuarios = _usuarioDAO.ObtenerTodos();
            foreach(var item in listaUsuarios)
            {
                UsuarioDTO usr = new()
                {
                    IdUsuario = item.IdUsuario,
                    NombreUsuario = item.NombreUsuario,
                    ApellidosUsuario = item.ApellidosUsuario,
                    IdentificacionUsuario = item.IdentificacionUsuario,
                    TelefonoUsuario = item.TelefonoUsuario,
                    DireccionUsuario = item.DireccionUsuario,
                    ContraseñaUsuario = item.ContraseñaUsuario,
                    CorreoUsuario = item.CorreoUsuario,
                    Role = item.Role
                };
                usuarioDTOs.Add(usr);
            }
            return usuarioDTOs;
        }

        public UsuarioDTO ObtenerPorID(int idUsuario)
        {
            var usuario = _usuarioDAO.ObtenerPorID(idUsuario);
            UsuarioDTO usr = new()
            {
                IdUsuario = usuario.IdUsuario,
                NombreUsuario = usuario.NombreUsuario,
                ApellidosUsuario = usuario.ApellidosUsuario,
                IdentificacionUsuario = usuario.IdentificacionUsuario,
                TelefonoUsuario = usuario.TelefonoUsuario,
                DireccionUsuario = usuario.DireccionUsuario,
                ContraseñaUsuario = usuario.ContraseñaUsuario,
                CorreoUsuario = usuario.CorreoUsuario,
                Role = usuario.Role
            };
            return usr;
        }

        public UsuarioDTO AgregarUsuario (UsuarioDTO usuarioRequest)
        {
            return _usuarioDAO.Agregar(usuarioRequest);
        }

        public UsuarioDTO ModificarUsuario(UsuarioDTO usuarioRequest)
        {
            return _usuarioDAO.Modificar(usuarioRequest);
        }

        public string EliminarUsuario (int idUsuario)
        {
            if (!_usuarioDAO.Eliminar(idUsuario))
            {
                return "Eliminado exitosamente";
            }
            else
            {
                return "No se pudo eliminar";
            }
        }
    }
}
