using System;
using System.Threading;
using DotNetify;
using DotNetify.Security;

namespace server
{
   [Authorize]
   public class LiveGaugeVM : BaseVM
   {
      private const int _timeInterval = 1000;
      private Timer _timer;

      public int Value { get; set; }

      public LiveGaugeVM()
      {
         var random = new Random();
         _timer = new Timer(state =>
         {
            Value = random.Next(1, 100);

            Changed(nameof(Value));
            PushUpdates(); 

         }, null, _timeInterval, _timeInterval);
      }

      public override void Dispose()
      {
         _timer.Dispose();
         base.Dispose();   
      }
   }
}
