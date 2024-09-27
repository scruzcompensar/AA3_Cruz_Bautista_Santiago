using System.Net;
using UCompensarAPI.Common;

namespace UCompensarAPI.Config
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _requestDelegate;

        public ExceptionMiddleware(RequestDelegate requestDelegate)
        {
            _requestDelegate = requestDelegate;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _requestDelegate(httpContext);
            }
            catch (Exception ex)
            {
                await GlobalExceptionAsync(httpContext, ex);
            }
        }

        private static Task GlobalExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.NotAcceptable;
            return context.Response.WriteAsJsonAsync(new ErrorDetail()
            {
                StatusCode = StatusCodes.Status400BadRequest,
                Message = exception.Message,
                StackTrace = exception.StackTrace
            });
        }
    }
}
