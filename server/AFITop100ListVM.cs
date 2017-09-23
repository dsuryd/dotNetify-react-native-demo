using System;
using System.Collections.Generic;
using System.Linq;
using DotNetify;
using DotNetify.Security;

namespace server
{
   [Authorize]
   public class AFITop100ListVM : BaseVM
   {
      private readonly MovieService _movieService;
      private int _recordsPerPage;

      public int RecordsPerPage
      {
         set
         {
            _recordsPerPage = value;
            MaxPage = (int)Math.Ceiling(_movieService.GetAFITop100().Count() / (double)_recordsPerPage);
         }
      }

      public int MaxPage
      {
         get { return Get<int>(); }
         set { Set(value); }
      }

      public int CurrentPage
      {
         get { return Get<int>(); }
         set { Set(value); }
      }

      public Action Next => () =>
      {
         if (CurrentPage < MaxPage)
         {
            CurrentPage++;
            Changed(nameof(Movies));
         }
      };

      public IEnumerable<object> Movies => _movieService
         .GetAFITop100()
         .Select(movie => new { Rank = movie.Rank, Movie = movie.Movie })
         .Skip(_recordsPerPage * (CurrentPage - 1))
         .Take(_recordsPerPage);

      public AFITop100ListVM(MovieService movieService)
      {
         _movieService = movieService;
         RecordsPerPage = 10;
         CurrentPage = 1;
      }
   }
}
