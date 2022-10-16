using Serilog.Events;

namespace ProductCatalog.WebApi;

public static class LogHelper
{
    private static bool IsHealthCheckEndpoint(HttpContext ctx)
    {
        var endpoint = ctx.GetEndpoint();

        if (endpoint is null) return false;

        return string.Compare(endpoint.DisplayName,
                              "Health checks",
                              StringComparison.Ordinal) == 0;
    }

    private static bool IsServerError(HttpContext ctx, Exception ex) => ex is not null || ctx.Response.StatusCode > 499;

    public static LogEventLevel LogHealthCheckRequestsWithDebugEventLevel(HttpContext ctx, double _, Exception ex)
    {
        if (IsServerError(ctx, ex)) return LogEventLevel.Error;

        if (IsHealthCheckEndpoint(ctx)) return LogEventLevel.Debug;

        return LogEventLevel.Information;
    }
}
