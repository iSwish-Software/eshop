using ProductCatalog.WebApi;
using Serilog;
using Serilog.Enrichers.Span;
using Serilog.Sinks.SystemConsole.Themes;

var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();
builder.Host.UseSerilog((context, config) =>
{
    config
        .ReadFrom.Configuration(context.Configuration)
        .Enrich.FromLogContext()
        //.Enrich.WithExceptionDetails()
        .Enrich.With<ActivityEnricher>()
        .WriteTo.Console(
            outputTemplate: "[{Timestamp:HH:mm:ss} {Level}] {SourceContext}{NewLine}{Message:lj}{NewLine}{Exception}{NewLine}",
            theme: AnsiConsoleTheme.Code)
        ;
});

// Add services to the container.
builder.Services.AddHealthChecks();
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseSerilogRequestLogging(options =>
{
    options.GetLevel = LogHelper.LogHealthCheckRequestsWithDebugEventLevel;
});

app.UseAuthorization();

app.MapHealthChecks("health");
app.MapControllers();

app.Run();
