namespace WimBosman.Orders.Module.Types
{
  public enum WBOrderStatuses
  {
    RFL,  //Ready for Logistics
    CPLC, //Complete Logic check - orders that can only be dispatched completely
    PLCC, //Partial logic check - orders that can be  partially dispatched (B2B split order),
    RPOS, //Received Purchase Order Stock
    SPLIT 
  }
}
