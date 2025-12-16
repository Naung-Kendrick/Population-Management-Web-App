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
  Activity
} from 'lucide-react';

// --- TYPES ---
interface ImmigrationRecord {
  id: number;
  date: string;
  township: string;
  household: number;
  male: number;
  female: number;
  smart_card: number;
  taang: number;
  shan: number;
  bamar: number;
  revenue: number;
}

interface FormDataState {
  township: string;
  date: string;
  household: number | string;
  male: number | string;
  female: number | string;
  smart_card: number | string;
  taang: number | string;
  shan: number | string;
  bamar: number | string;
}

// --- MOCK DATA (ဒေတာအစမ်းများ) ---
const INITIAL_RECORDS: ImmigrationRecord[] = [
  { id: 1, date: '2025-12-16', township: 'နမ့်ဆန်', household: 5, male: 12, female: 15, smart_card: 10, taang: 25, shan: 2, bamar: 0, revenue: 100000 },
  { id: 2, date: '2025-12-16', township: 'မန်တုံ', household: 3, male: 8, female: 9, smart_card: 5, taang: 10, shan: 7, bamar: 0, revenue: 50000 },
  { id: 3, date: '2025-12-15', township: 'နမ့်ဆန်', household: 10, male: 25, female: 30, smart_card: 20, taang: 50, shan: 5, bamar: 0, revenue: 200000 },
];

const TOWNSHIPS = ['နမ့်ဆန်', 'မန်တုံ', 'နမ့်ခမ်း', 'ကွတ်ခိုင်', 'မန်ပန်'];
const SMART_CARD_RATE = 10000; // ၁ ကဒ်လျှင် ၁ သောင်းကျပ်

// --- COMPONENTS ---

const DataEntryForm = ({ 
  records, 
  setRecords, 
  setActiveTab 
}: { 
  records: ImmigrationRecord[], 
  setRecords: React.Dispatch<React.SetStateAction<ImmigrationRecord[]>>, 
  setActiveTab: (tab: string) => void 
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

  // Auto Calculate Totals for Preview
  const maleVal = typeof formData.male === 'string' ? (parseInt(formData.male) || 0) : formData.male;
  const femaleVal = typeof formData.female === 'string' ? (parseInt(formData.female) || 0) : formData.female;
  const smartCardVal = typeof formData.smart_card === 'string' ? (parseInt(formData.smart_card) || 0) : formData.smart_card;
  
  const totalPop = maleVal + femaleVal;
  const estimatedRevenue = smartCardVal * SMART_CARD_RATE;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: ImmigrationRecord = {
      id: Date.now(),
      date: formData.date,
      township: formData.township,
      household: typeof formData.household === 'string' ? parseInt(formData.household) || 0 : formData.household,
      male: maleVal,
      female: femaleVal,
      smart_card: smartCardVal,
      taang: typeof formData.taang === 'string' ? parseInt(formData.taang) || 0 : formData.taang,
      shan: typeof formData.shan === 'string' ? parseInt(formData.shan) || 0 : formData.shan,
      bamar: typeof formData.bamar === 'string' ? parseInt(formData.bamar) || 0 : formData.bamar,
      revenue: estimatedRevenue
    };
    setRecords([newRecord, ...records]);
    alert("စာရင်းသိမ်းဆည်းပြီးပါပြီ (Saved Successfully)");
    setActiveTab('records'); // Go to list view
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-6 text-slate-800 border-b pb-2 flex items-center">
        <PlusCircle className="mr-2" /> နေ့စဉ်စာရင်းသွင်းရန် (Daily Entry)
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* General Info */}
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-600">အခြေခံအချက်အလက်များ</h3>
          <div>
            <label className="block text-sm font-medium text-slate-700">ရက်စွဲ</label>
            <input type="date" required 
              value={formData.date}
              onChange={e => setFormData({...formData, date: e.target.value})}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">မြို့နယ်</label>
            <select 
              value={formData.township}
              onChange={e => setFormData({...formData, township: e.target.value})}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 border"
            >
              {TOWNSHIPS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">အိမ်ထောင်စု အသစ်တိုး</label>
            <input type="number" min="0" required
              value={formData.household}
              onChange={e => setFormData({...formData, household: e.target.value})}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 border"
            />
          </div>
        </div>

        {/* Population & Smart Card */}
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-600">လူဦးရေ နှင့် Smart Card</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">ကျား</label>
              <input type="number" min="0" required
                value={formData.male}
                onChange={e => setFormData({...formData, male: e.target.value})}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 border bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">မ</label>
              <input type="number" min="0" required
                value={formData.female}
                onChange={e => setFormData({...formData, female: e.target.value})}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 border bg-pink-50"
              />
            </div>
          </div>
          
          {/* Auto Calculated Display */}
          <div className="bg-slate-100 p-3 rounded text-center">
            <span className="text-sm text-slate-500">စုစုပေါင်း လူဦးရေ (System Auto)</span>
            <div className="text-xl font-bold text-slate-800">{totalPop} ဦး</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Smart Card ပြီးစီးမှု</label>
            <input type="number" min="0" required
              value={formData.smart_card}
              onChange={e => setFormData({...formData, smart_card: e.target.value})}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 border bg-green-50"
            />
            <p className="text-xs text-green-600 mt-1">ခန့်မှန်းဝင်ငွေ: {estimatedRevenue.toLocaleString()} ကျပ်</p>
          </div>
        </div>

        {/* Ethnicity */}
        <div className="md:col-span-2 border-t pt-4">
          <h3 className="font-semibold text-slate-600 mb-3">လူမျိုးအလိုက် စာရင်း</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700">တအာင်း</label>
              <input type="number" min="0" 
                value={formData.taang}
                onChange={e => setFormData({...formData, taang: e.target.value})}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 border"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700">ရှမ်း</label>
              <input type="number" min="0" 
                value={formData.shan}
                onChange={e => setFormData({...formData, shan: e.target.value})}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 border"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700">ဗမာ/အခြား</label>
              <input type="number" min="0" 
                value={formData.bamar}
                onChange={e => setFormData({...formData, bamar: e.target.value})}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm p-2 border"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="md:col-span-2 w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center font-bold">
          <Save className="w-5 h-5 mr-2" /> စာရင်းသွင်းမည် (Save Report)
        </button>
      </form>
    </div>
  );
};

const RecordsList = ({ records }: { records: ImmigrationRecord[] }) => {
  const [filterTownship, setFilterTownship] = useState('All');

  const filteredRecords = filterTownship === 'All' 
    ? records 
    : records.filter(r => r.township === filterTownship);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center bg-slate-50">
        <h2 className="font-bold text-slate-700 flex items-center">
          <FileText className="w-5 h-5 mr-2" /> နေ့စဉ် စာရင်းများ
        </h2>
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-slate-500" />
          <select 
            value={filterTownship}
            onChange={(e) => setFilterTownship(e.target.value)}
            className="border-slate-300 border rounded text-sm p-1"
          >
            <option value="All">အားလုံး (All Townships)</option>
            {TOWNSHIPS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase">ရက်စွဲ</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase">မြို့နယ်</th>
              <th className="px-4 py-3 text-right text-xs font-bold text-slate-600 uppercase">အိမ်ထောင်စု</th>
              <th className="px-4 py-3 text-right text-xs font-bold text-slate-600 uppercase">လူဦးရေ (စုစုပေါင်း)</th>
              <th className="px-4 py-3 text-right text-xs font-bold text-slate-600 uppercase">Smart Card</th>
              <th className="px-4 py-3 text-right text-xs font-bold text-slate-600 uppercase">ဝင်ငွေ</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {filteredRecords.map((record) => (
              <tr key={record.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">{record.date}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900">{record.township}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-slate-900">{record.household}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-blue-600 font-semibold">
                  {record.male + record.female}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-green-600 font-bold">
                  {record.smart_card}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-slate-600">
                  {record.revenue.toLocaleString()} Ks
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredRecords.length === 0 && (
          <div className="p-8 text-center text-slate-500">ရှာဖွေမှုရလဒ် မရှိပါ။</div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [records, setRecords] = useState<ImmigrationRecord[]>(INITIAL_RECORDS);
  const [userRole, setUserRole] = useState('admin'); // 'admin' or 'viewer'

  // --- DASHBOARD CALCULATION (အလိုအလျောက် တွက်ချက်ခြင်း) ---
  const stats = useMemo(() => {
    return records.reduce((acc, curr) => {
      acc.total_household += curr.household;
      acc.total_pop += (curr.male + curr.female);
      acc.total_smart_card += curr.smart_card;
      acc.total_revenue += curr.revenue;
      return acc;
    }, { total_household: 0, total_pop: 0, total_smart_card: 0, total_revenue: 0 });
  }, [records]);

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold text-white">PSLF/TNLA</h1>
          <p className="text-xs text-slate-400 mt-1">Immigration Department</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('entry')}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'entry' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            <PlusCircle className="w-5 h-5 mr-3" /> Data Entry
          </button>
          <button 
            onClick={() => setActiveTab('records')}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'records' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            <FileText className="w-5 h-5 mr-3" /> စာရင်းများ (Records)
          </button>
        </nav>
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center space-x-3 text-sm text-slate-300 mb-4">
             <div className="w-2 h-2 rounded-full bg-green-500"></div>
             <span>Admin User</span>
          </div>
          <button className="flex items-center text-slate-400 hover:text-white text-sm">
            <LogOut className="w-4 h-4 mr-2" /> ထွက်ရန် (Logout)
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4 md:hidden flex justify-between items-center">
             <span className="font-bold">Immigration App</span>
             {/* Mobile Menu Toggle would go here */}
        </header>

        <main className="p-6">
          
          {/* Dashboard View */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-800">အနှစ်ချုပ် စာရင်းများ (Dashboard)</h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-slate-500">စုစုပေါင်း လူဦးရေ</p>
                      <h3 className="text-3xl font-bold text-slate-800 mt-2">{stats.total_pop.toLocaleString()}</h3>
                    </div>
                    <Users className="text-blue-500 bg-blue-100 p-2 rounded-lg w-10 h-10" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-slate-500">Smart Card ပြီးစီးမှု</p>
                      <h3 className="text-3xl font-bold text-slate-800 mt-2">{stats.total_smart_card.toLocaleString()}</h3>
                    </div>
                    <CreditCard className="text-green-500 bg-green-100 p-2 rounded-lg w-10 h-10" />
                  </div>
                  <div className="mt-2 text-xs text-green-600 font-medium">
                    +15 ယနေ့တိုး
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-slate-500">အိမ်ထောင်စုစာရင်း</p>
                      <h3 className="text-3xl font-bold text-slate-800 mt-2">{stats.total_household.toLocaleString()}</h3>
                    </div>
                    <FileText className="text-purple-500 bg-purple-100 p-2 rounded-lg w-10 h-10" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-orange-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-slate-500">ရရှိဝင်ငွေ (Total Revenue)</p>
                      <h3 className="text-2xl font-bold text-slate-800 mt-2">{stats.total_revenue.toLocaleString()} Ks</h3>
                    </div>
                    <TrendingUp className="text-orange-500 bg-orange-100 p-2 rounded-lg w-10 h-10" />
                  </div>
                </div>
              </div>

              {/* Charts Area (Visual Mockup) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-bold text-slate-700 mb-4 flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-blue-500"/> လူဦးရေသိပ်သည်းမှု (မြို့နယ်အလိုက်)
                    </h3>
                    <div className="h-64 flex items-end justify-between space-x-2 px-4 border-b border-l border-slate-200 pb-2">
                       {/* Simple CSS Bar Chart */}
                       {['နမ့်ဆန်', 'မန်တုံ', 'နမ့်ခမ်း', 'ကွတ်ခိုင်'].map((town, idx) => (
                         <div key={town} className="flex flex-col items-center w-full group">
                            <div className="relative w-full flex justify-center">
                                <span className="absolute -top-6 text-xs font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {idx === 0 ? '45%' : idx === 1 ? '30%' : '15%'}
                                </span>
                                <div 
                                    className={`w-10 rounded-t-md hover:opacity-80 transition-all cursor-pointer ${idx === 0 ? 'bg-blue-600 h-40' : idx === 1 ? 'bg-blue-400 h-24' : 'bg-blue-300 h-16'}`}
                                ></div>
                            </div>
                            <span className="text-xs text-slate-500 mt-2">{town}</span>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-bold text-slate-700 mb-4">ပြီးခဲ့သော ၇ ရက်အတွင်း လုပ်ဆောင်ချက်များ</h3>
                    <RecordsList records={records} />
                 </div>
              </div>
            </div>
          )}

          {/* Data Entry View */}
          {activeTab === 'entry' && (
            <div className="animate-fade-in">
              <DataEntryForm records={records} setRecords={setRecords} setActiveTab={setActiveTab} />
            </div>
          )}

          {/* Records List View */}
          {activeTab === 'records' && (
             <div className="animate-fade-in space-y-4">
               <h2 className="text-2xl font-bold text-slate-800">စာရင်းမှတ်တမ်းများ (All Records)</h2>
               <RecordsList records={records} />
             </div>
          )}

        </main>
      </div>
    </div>
  );
}