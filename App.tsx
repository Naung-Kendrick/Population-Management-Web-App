import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  CreditCard, 
  PlusCircle, 
  LogOut, 
  MapPin, 
  Search,
  Save,
  TrendingUp,
  Activity,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { ImmigrationRecord, FormDataState } from './types';

// --- CONSTANTS ---
const TOWNSHIPS = ['နမ့်ဆန်', 'မန်တုံ', 'နမ့်ခမ်း', 'ကွတ်ခိုင်', 'မန်ပန်', 'ကျောက်မဲ'];
const SMART_CARD_RATE = 10000; 
const STORAGE_KEY = 'pslf_immigration_data_v1';

// --- MOCK DATA ---
const INITIAL_RECORDS: ImmigrationRecord[] = [
  { id: 1, date: '2025-12-16', township: 'နမ့်ဆန်', household: 5, male: 12, female: 15, smart_card: 10, taang: 25, shan: 2, bamar: 0, revenue: 100000 },
  { id: 2, date: '2025-12-16', township: 'မန်တုံ', household: 3, male: 8, female: 9, smart_card: 5, taang: 10, shan: 7, bamar: 0, revenue: 50000 },
];

// --- COMPONENTS ---

const DataEntryForm = ({ 
  onAddRecord, 
  onCancel 
}: { 
  onAddRecord: (record: ImmigrationRecord) => void,
  onCancel: () => void
}) => {
  const [formData, setFormData] = useState<FormDataState>({
    township: 'နမ့်ဆန်',
    date: new Date().toISOString().split('T')[0],
    household: 0,
    male: 0,
    female: 0,
    smart_card: 0,
    taang: 0,
    shan: 0,
    bamar: 0
  });

  const maleVal = Number(formData.male) || 0;
  const femaleVal = Number(formData.female) || 0;
  const smartCardVal = Number(formData.smart_card) || 0;
  const totalPop = maleVal + femaleVal;
  const estimatedRevenue = smartCardVal * SMART_CARD_RATE;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: ImmigrationRecord = {
      id: Date.now(),
      date: formData.date,
      township: formData.township,
      household: Number(formData.household) || 0,
      male: maleVal,
      female: femaleVal,
      smart_card: smartCardVal,
      taang: Number(formData.taang) || 0,
      shan: Number(formData.shan) || 0,
      bamar: Number(formData.bamar) || 0,
      revenue: estimatedRevenue
    };
    onAddRecord(newRecord);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 animate-fade-in max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center">
          <PlusCircle className="mr-3 text-blue-600" /> နေ့စဉ်စာရင်းသွင်းရန် (Daily Entry)
        </h2>
        <button onClick={onCancel} className="text-slate-400 hover:text-slate-600">မလုပ်တော့ပါ</button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <h3 className="font-bold text-blue-800 text-sm uppercase tracking-wider">အခြေခံအချက်အလက်</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">ရက်စွဲ</label>
              <input type="date" required value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                className="w-full rounded-lg border-slate-300 shadow-sm p-3 border focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">မြို့နယ်</label>
              <select value={formData.township}
                onChange={e => setFormData({...formData, township: e.target.value})}
                className="w-full rounded-lg border-slate-300 shadow-sm p-3 border focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {TOWNSHIPS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">အိမ်ထောင်စု အသစ်တိုး</label>
              <input type="number" min="0" required value={formData.household}
                onChange={e => setFormData({...formData, household: e.target.value})}
                className="w-full rounded-lg border-slate-300 shadow-sm p-3 border focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <h3 className="font-bold text-blue-800 text-sm uppercase tracking-wider">လူဦးရေ နှင့် Smart Card</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">ကျား</label>
              <input type="number" min="0" required value={formData.male}
                onChange={e => setFormData({...formData, male: e.target.value})}
                className="w-full rounded-lg border-blue-200 shadow-sm p-3 border bg-blue-50 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">မ</label>
              <input type="number" min="0" required value={formData.female}
                onChange={e => setFormData({...formData, female: e.target.value})}
                className="w-full rounded-lg border-pink-200 shadow-sm p-3 border bg-pink-50 focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>
          </div>
          <div className="bg-slate-900 p-4 rounded-lg flex justify-between items-center text-white">
            <span className="text-sm font-medium opacity-80">စုစုပေါင်း လူဦးရေ</span>
            <span className="text-2xl font-bold">{totalPop}</span>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Smart Card ပြီးစီးမှု</label>
            <input type="number" min="0" required value={formData.smart_card}
              onChange={e => setFormData({...formData, smart_card: e.target.value})}
              className="w-full rounded-lg border-green-200 shadow-sm p-3 border bg-green-50 focus:ring-2 focus:ring-green-500 outline-none font-bold text-green-700"
            />
            <div className="flex justify-between mt-2 px-1">
              <span className="text-xs text-slate-500">ရရှိဝင်ငွေခန့်မှန်း</span>
              <span className="text-xs font-bold text-green-600">{estimatedRevenue.toLocaleString()} ကျပ်</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 border-t pt-6">
          <h3 className="font-bold text-slate-700 mb-4 text-sm uppercase">လူမျိုးအလိုက် စာရင်း</h3>
          <div className="grid grid-cols-3 gap-6">
            {['taang', 'shan', 'bamar'].map((race) => (
              <div key={race}>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">
                  {race === 'taang' ? 'တအာင်း' : race === 'shan' ? 'ရှမ်း' : 'ဗမာ/အခြား'}
                </label>
                <input type="number" min="0" 
                  value={(formData as any)[race]}
                  onChange={e => setFormData({...formData, [race]: e.target.value})}
                  className="w-full rounded-lg border-slate-200 p-3 border focus:border-blue-400 outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 flex gap-4 pt-4">
          <button type="submit" className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-xl hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center font-bold shadow-lg shadow-blue-200">
            <Save className="w-5 h-5 mr-3" /> စာရင်းသိမ်းဆည်းမည် (Save Report)
          </button>
        </div>
      </form>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [records, setRecords] = useState<ImmigrationRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTownship, setFilterTownship] = useState('All');
  const [isLoaded, setIsLoaded] = useState(false);

  // --- PERSISTENCE ---
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setRecords(JSON.parse(saved));
      } catch (e) {
        setRecords(INITIAL_RECORDS);
      }
    } else {
      setRecords(INITIAL_RECORDS);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    }
  }, [records, isLoaded]);

  // --- LOGIC ---
  const stats = useMemo(() => {
    return records.reduce((acc, curr) => {
      acc.total_household += curr.household;
      acc.total_pop += (curr.male + curr.female);
      acc.total_smart_card += curr.smart_card;
      acc.total_revenue += curr.revenue;
      return acc;
    }, { total_household: 0, total_pop: 0, total_smart_card: 0, total_revenue: 0 });
  }, [records]);

  const filteredRecords = useMemo(() => {
    return records.filter(r => {
      const matchesSearch = r.township.toLowerCase().includes(searchTerm.toLowerCase()) || r.date.includes(searchTerm);
      const matchesTownship = filterTownship === 'All' || r.township === filterTownship;
      return matchesSearch && matchesTownship;
    });
  }, [records, searchTerm, filterTownship]);

  const addRecord = (record: ImmigrationRecord) => {
    setRecords([record, ...records]);
    setActiveTab('records');
  };

  const deleteRecord = (id: number) => {
    if (confirm('ဤစာရင်းကို ဖျက်ရန် သေချာပါသလား?')) {
      setRecords(records.filter(r => r.id !== id));
    }
  };

  if (!isLoaded) return <div className="h-screen w-screen flex items-center justify-center bg-slate-50 text-slate-400">Loading...</div>;

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden lg:flex flex-col shadow-2xl">
        <div className="p-8 border-b border-slate-800">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">P</div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight">PSLF/TNLA</h1>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Immigration Dept.</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 mt-4">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center p-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
          </button>
          <button onClick={() => setActiveTab('entry')} className={`w-full flex items-center p-3 rounded-xl transition-all ${activeTab === 'entry' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <PlusCircle className="w-5 h-5 mr-3" /> Data Entry
          </button>
          <button onClick={() => setActiveTab('records')} className={`w-full flex items-center p-3 rounded-xl transition-all ${activeTab === 'records' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <FileText className="w-5 h-5 mr-3" /> စာရင်းမှတ်တမ်း
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-950/50">
          <div className="flex items-center p-2 mb-4 space-x-3">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">AD</div>
            <div className="flex-1">
              <p className="text-xs font-bold">Admin User</p>
              <p className="text-[10px] text-green-500 flex items-center"><CheckCircle2 className="w-2 h-2 mr-1"/> Online</p>
            </div>
          </div>
          <button className="w-full flex items-center p-2 text-slate-500 hover:text-red-400 text-sm transition-colors">
            <LogOut className="w-4 h-4 mr-2" /> ထွက်ရန် (Logout)
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col">
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200 px-6 py-4 flex justify-between items-center lg:justify-end">
          <div className="lg:hidden font-bold text-slate-800 flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white mr-2">P</div>
            PSLF/TNLA
          </div>
          <div className="flex items-center space-x-4">
             <div className="hidden sm:flex items-center text-xs text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">
               <Activity className="w-3 h-3 mr-1.5 text-blue-500"/> System Active
             </div>
             <div className="text-sm font-bold text-slate-700">{new Date().toLocaleDateString('my-MM', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
          </div>
        </header>

        <main className="p-6 max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-800">Dashboard အနှစ်ချုပ်</h2>
                <p className="text-slate-500 mt-1 font-medium">နောက်ဆုံးရ ဒေတာများကို တစ်နေရာတည်းတွင် ကြည့်ရှုပါ</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'စုစုပေါင်း လူဦးရေ', val: stats.total_pop, icon: Users, color: 'blue' },
                  { label: 'Smart Card ပြီးစီးမှု', val: stats.total_smart_card, icon: CreditCard, color: 'green' },
                  { label: 'အိမ်ထောင်စုစာရင်း', val: stats.total_household, icon: FileText, color: 'purple' },
                  { label: 'စုစုပေါင်း ဝင်ငွေ', val: `${stats.total_revenue.toLocaleString()} Ks`, icon: TrendingUp, color: 'orange' },
                ].map((stat, i) => (
                  <div key={i} className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group`}>
                    <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-${stat.color}-50 rounded-full opacity-50 group-hover:scale-110 transition-transform`}></div>
                    <div className="relative">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                      <h3 className="text-3xl font-black text-slate-800 mt-2">{stat.val}</h3>
                    </div>
                    <stat.icon className={`text-${stat.color}-600 absolute bottom-6 right-6 w-8 h-8 opacity-40`} />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="font-extrabold text-slate-800 text-lg flex items-center">
                        <Activity className="w-5 h-5 mr-2 text-blue-600"/> မြို့နယ်အလိုက် နှိုင်းယှဉ်ချက်
                      </h3>
                      <div className="flex space-x-2 text-[10px] font-bold text-slate-400">
                        <span className="flex items-center"><div className="w-2 h-2 bg-blue-600 rounded-full mr-1"></div> လူဦးရေ</span>
                      </div>
                    </div>
                    <div className="h-72 flex items-end justify-between space-x-4 border-b border-slate-100 pb-2 px-4">
                       {TOWNSHIPS.slice(0, 5).map((town, idx) => {
                         const count = records.filter(r => r.township === town).reduce((a, b) => a + (b.male + b.female), 0);
                         const maxCount = Math.max(...TOWNSHIPS.map(t => records.filter(r => r.township === t).reduce((a, b) => a + (b.male + b.female), 0)), 1);
                         const heightPercent = (count / maxCount) * 100;
                         return (
                           <div key={town} className="flex flex-col items-center flex-1 group">
                              <div className="relative w-full flex justify-center">
                                  <div className="absolute -top-10 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                                      {count.toLocaleString()} ဦး
                                  </div>
                                  <div 
                                      style={{ height: `${Math.max(heightPercent, 5)}%` }}
                                      className="w-12 bg-blue-600 rounded-t-xl hover:bg-blue-700 transition-all cursor-pointer shadow-lg shadow-blue-100"
                                  ></div>
                              </div>
                              <span className="text-[11px] font-bold text-slate-500 mt-4 rotate-[-45deg] lg:rotate-0 truncate w-full text-center">{town}</span>
                           </div>
                         );
                       })}
                    </div>
                 </div>

                 <div className="bg-slate-900 p-8 rounded-2xl text-white shadow-xl shadow-slate-200 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-4">အမြန်လုပ်ဆောင်ရန်</h3>
                      <p className="text-slate-400 text-sm mb-6">နေ့စဉ် စာရင်းအသစ်များအား ဤနေရာမှ တိုက်ရိုက်ထည့်သွင်းနိုင်ပါသည်။</p>
                      <button onClick={() => setActiveTab('entry')} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-blue-900">
                        <PlusCircle className="w-5 h-5 mr-3" /> ဒေတာအသစ်ထည့်ရန်
                      </button>
                    </div>
                    <div className="mt-8 pt-8 border-t border-slate-800">
                       <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">ယနေ့ ပြီးစီးမှု</span>
                          <span className="font-bold">75%</span>
                       </div>
                       <div className="w-full h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
                          <div className="h-full bg-blue-500 w-3/4 rounded-full"></div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'entry' && (
             <DataEntryForm onAddRecord={addRecord} onCancel={() => setActiveTab('dashboard')} />
          )}

          {activeTab === 'records' && (
             <div className="animate-fade-in space-y-6">
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-3xl font-extrabold text-slate-800">စာရင်းမှတ်တမ်းများ</h2>
                    <p className="text-slate-500 font-medium">ထည့်သွင်းထားသော ဒေတာများအားလုံးအား စီစစ်ကြည့်ရှုနိုင်သည်</p>
                  </div>
                  <button onClick={() => setActiveTab('entry')} className="bg-blue-600 text-white px-5 py-3 rounded-xl font-bold flex items-center shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
                    <PlusCircle className="w-5 h-5 mr-2" /> အသစ်ထည့်ရန်
                  </button>
               </div>

               <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="ရက်စွဲ သို့မဟုတ် မြို့နယ်ဖြင့် ရှာဖွေရန်..." 
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 border border-transparent transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="text-slate-400 w-5 h-5" />
                    <select 
                      value={filterTownship}
                      onChange={(e) => setFilterTownship(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="All">မြို့နယ်အားလုံး</option>
                      {TOWNSHIPS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
               </div>

               <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                          <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">ရက်စွဲ</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">မြို့နယ်</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">အိမ်ထောင်စု</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">လူဦးရေ</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Smart Card</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">ဝင်ငွေ</th>
                          <th className="px-6 py-4 text-center"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {filteredRecords.map((r) => (
                          <tr key={r.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-6 py-4 text-sm font-bold text-slate-600">{r.date}</td>
                            <td className="px-6 py-4"><span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">{r.township}</span></td>
                            <td className="px-6 py-4 text-right font-medium text-slate-700">{r.household}</td>
                            <td className="px-6 py-4 text-right">
                               <div className="flex flex-col items-end">
                                 <span className="font-bold text-slate-900">{r.male + r.female}</span>
                                 <span className="text-[10px] text-slate-400">ကျား: {r.male} / မ: {r.female}</span>
                               </div>
                            </td>
                            <td className="px-6 py-4 text-right font-black text-green-600">{r.smart_card}</td>
                            <td className="px-6 py-4 text-right text-sm font-bold text-slate-500">{r.revenue.toLocaleString()} Ks</td>
                            <td className="px-6 py-4 text-center">
                               <button 
                                 onClick={() => deleteRecord(r.id)}
                                 className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                               >
                                 <Trash2 className="w-4 h-4" />
                               </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredRecords.length === 0 && (
                      <div className="p-20 text-center flex flex-col items-center">
                        <Search className="w-12 h-12 text-slate-200 mb-4" />
                        <p className="text-slate-400 font-bold">ရှာဖွေမှုရလဒ် မရှိသေးပါ။</p>
                      </div>
                    )}
                 </div>
               </div>
             </div>
          )}
        </main>
      </div>
    </div>
  );
}