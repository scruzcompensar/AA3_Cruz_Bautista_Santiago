using Microsoft.AspNetCore.Mvc;
using UCompensarAPI.Common.DTOS;
using UCompensarAPI.Services.Services;
using static UCompensarAPI.Config.ApiRoutes;

namespace UCompensarAPI.Controllers
{
    public class UsuarioController : Controller
    {
        private readonly IUsuarioService _usuarioService;

        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpGet]
        [Route(Usuario.ObtenerUsuarioId)]
        public IActionResult Get(int id)
        {
            return Ok(_usuarioService.ObtenerPorID(id));
        }

        [HttpGet]
        [Route(Usuario.ObtenerTodos)]
        public IActionResult GetAll()
        {
            return Ok(_usuarioService.ObtenerTodosUsuario());
        }

        [HttpPost]
        [Route(Usuario.AgregarUsuario)]
        public IActionResult Add([FromBody] UsuarioDTO request)
        {
            return Ok(_usuarioService.AgregarUsuario(request));
        }

        [HttpPut]
        [Route(Usuario.ModificarUsuario)]
        public IActionResult Modify([FromBody] UsuarioDTO request)
        {
            return Ok(_usuarioService.ModificarUsuario(request));
        }

        [HttpDelete]
        [Route(Usuario.EliminarUsuario)]
        public IActionResult Delete(int id)
        {
            return Ok(_usuarioService.EliminarUsuario(id));
        }
    }
}
