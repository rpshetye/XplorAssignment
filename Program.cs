using XplorAssignment.Models;
using XplorAssignment.Services.Interfaces;
using XplorAssignment.Services.Repositories;
using XplorAssignment.Services;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins,
        builder =>
        {
            builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});



// Add services to the container.
var provider = builder.Services.BuildServiceProvider();
var configration = provider.GetRequiredService<IConfiguration>();
builder.Services.AddControllersWithViews();
builder.Services.AddScoped(typeof(IRepository<>), typeof(RepositoryAPI<>));
//builder.Services.AddScoped<IRepository<Customer>, RepositoryAPI<Customer>>();

//builder.Services.AddScoped<IConfiguration>(IRepository<Customer>).(provider => configuration);
//builder.Services.AddScoped<IRepository<Customer>, CustomerService>();

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
