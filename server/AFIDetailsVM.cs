using DotNetify;
using DotNetify.Security;

namespace server
{
   [Authorize]
   public class AFIDetailsVM : BaseVM
   {
      private readonly MovieService _movieService;

      public int Rank
      {
         get { return Get<int>(); }
         set
         {
            Set(value);
            Changed(nameof(MovieDetails));
         }
      }

      public AFIDetailsVM(MovieService movieService)
      {
          _movieService = movieService;
      }

      public MovieRecord MovieDetails => _movieService.GetMovieByAFIRank(Rank);
   }
}
