using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using Microsoft.Extensions.FileProviders;

namespace server
{
   public class MovieRecord
   {
      public int Rank { get; set; }
      public string Movie { get; set; }
      public int Year { get; set; }
      public string Cast { get; set; }
      public string Director { get; set; }
   }

   public class MovieService
   {
      private readonly IFileProvider _fileProvider;

      public MovieService(IFileProvider fileProvider)
      {
          _fileProvider = fileProvider;
      }

      public IEnumerable<MovieRecord> GetAFITop100() 
      {
         var jsonFile = _fileProvider.GetFileInfo("AFITop100.json");
         using (var stream = jsonFile.CreateReadStream())
         using (var reader = new System.IO.StreamReader(stream)) 
         {
            string data = reader.ReadToEnd();
            return JsonConvert.DeserializeObject<List<MovieRecord>>(data);
         }
      } 

      public MovieRecord GetMovieByAFIRank(int rank) => GetAFITop100().FirstOrDefault(i => i.Rank == rank);
   }
}
