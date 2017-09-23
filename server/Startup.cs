using System;
using System.IO;
using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using DotNetify;
using DotNetify.Security;

namespace server
{
   public class Startup
   {
      public void ConfigureServices(IServiceCollection services)
      {
         services.AddSingleton<IFileProvider>(new PhysicalFileProvider(Directory.GetCurrentDirectory()));
         services.AddSingleton<MovieService>();

         services.AddMemoryCache();
         services.AddSignalR();
         services.AddDotNetify();
      }
      public void Configure(IApplicationBuilder app)
      {
         app.UseWebSockets();
         app.UseSignalR();
         app.UseDotNetify(config => {
            string secretKey = "dotnetifydemo_secretkey_123!";
            var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKey));
            var tokenValidationParameters = new TokenValidationParameters
            {
               IssuerSigningKey = signingKey,
               ValidAudience = "DotNetifyDemoApp",
               ValidIssuer = "DotNetifyDemoServer",
               ValidateIssuerSigningKey = true,
               ValidateAudience = true,
               ValidateIssuer = true,
               ValidateLifetime = true,
               ClockSkew = TimeSpan.FromSeconds(0)
            };

            config.UseDeveloperLogging();
            config.UseJwtBearerAuthentication(tokenValidationParameters);
            config.UseFilter<AuthorizeFilter>();
         });

         app.UseAuthServer();
         app.Run(async (context) => 
            await context.Response.WriteAsync("dotnetify-react-native demo server")
         );
      }
   }
}