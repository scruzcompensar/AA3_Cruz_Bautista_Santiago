using UCompensarAPI.DataAccess.DAO;
using UCompensarAPI.Services.Services;

namespace UCompensarAPI.Config
{
    public static class ServiceColletionExtensions
    {
        public static IServiceCollection AddConfig(
             this IServiceCollection services, IConfiguration config)
        {
            services.AddTransient(typeof(IBaseDAO<>), typeof(BaseDAO<>));
            services.AddTransient<IUsuarioService, UsuarioService>();
            services.AddTransient<IUsuarioDAO, UsuarioDAO>();
            return services;
        }
    }
}
