using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PluginCaller
{
    class Program
    {
        static void Main(string[] args)
        {
            PluginMockClass.AccountPostCreate p = new PluginMockClass.AccountPostCreate();
            p.Execute();
        }
    }
}
