import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, TrendingUp, Shield, Calculator, Users, DollarSign, Activity } from 'lucide-react';

const InsurancePremiumCalculator = () => {
  const [applicantData, setApplicantData] = useState({
    age: 30,
    gender: 'male',
    location: 'urban',
    vehicleYear: 2020,
    vehicleType: 'sedan',
    drivingRecord: 'clean',
    creditScore: 750,
    annualMileage: 12000,
    coverageType: 'comprehensive'
  });

  const [marketConditions, setMarketConditions] = useState({
    competitorIndex: 0.95,
    claimFrequency: 0.12,
    inflationRate: 0.03,
    marketVolatility: 0.15
  });

  const [riskProfile, setRiskProfile] = useState({});
  const [premiumBreakdown, setPremiumBreakdown] = useState({});
  const [finalQuote, setFinalQuote] = useState(0);
  const [explanation, setExplanation] = useState([]);

  // Advanced Risk Assessment Engine
  const calculateRiskProfile = (data) => {
    const baseRisk = 100;
    
    // Age-based risk modeling (non-linear)
    const ageRisk = data.age < 25 ? 1.4 : 
                    data.age < 35 ? 1.0 : 
                    data.age < 50 ? 0.9 : 
                    data.age < 65 ? 0.95 : 1.2;
    
    // Gender-based statistical risk
    const genderRisk = data.gender === 'male' ? 1.1 : 0.95;
    
    // Location risk (urban vs suburban vs rural)
    const locationRisk = {
      'urban': 1.3,
      'suburban': 1.0,
      'rural': 0.8
    }[data.location];
    
    // Vehicle risk assessment
    const vehicleAge = 2024 - data.vehicleYear;
    const vehicleRisk = vehicleAge < 3 ? 1.2 : 
                       vehicleAge < 8 ? 1.0 : 0.9;
    
    const vehicleTypeRisk = {
      'sedan': 1.0,
      'suv': 1.1,
      'truck': 1.2,
      'sports': 1.5,
      'luxury': 1.3
    }[data.vehicleType];
    
    // Driving record impact
    const drivingRisk = {
      'clean': 0.8,
      'minor': 1.2,
      'major': 1.8,
      'severe': 2.5
    }[data.drivingRecord];
    
    // Credit score impact (inverse relationship)
    const creditRisk = data.creditScore > 750 ? 0.85 :
                      data.creditScore > 650 ? 1.0 :
                      data.creditScore > 550 ? 1.3 : 1.6;
    
    // Mileage-based risk
    const mileageRisk = data.annualMileage < 8000 ? 0.9 :
                       data.annualMileage < 15000 ? 1.0 :
                       data.annualMileage < 25000 ? 1.3 : 1.6;
    
    // Coverage type multiplier
    const coverageMultiplier = {
      'liability': 0.6,
      'collision': 0.8,
      'comprehensive': 1.0,
      'full': 1.2
    }[data.coverageType];
    
    const totalRisk = baseRisk * ageRisk * genderRisk * locationRisk * 
                     vehicleRisk * vehicleTypeRisk * drivingRisk * 
                     creditRisk * mileageRisk * coverageMultiplier;
    
    return {
      baseRisk,
      ageRisk,
      genderRisk,
      locationRisk,
      vehicleRisk: vehicleRisk * vehicleTypeRisk,
      drivingRisk,
      creditRisk,
      mileageRisk,
      coverageMultiplier,
      totalRisk
    };
  };

  // Market Analysis & Competitive Pricing
  const analyzeMarketConditions = () => {
    // Simulate real-time market data
    const timeOfDay = new Date().getHours();
    const dayOfWeek = new Date().getDay();
    
    // Market volatility based on time and external factors
    const timeVolatility = timeOfDay < 9 || timeOfDay > 17 ? 0.05 : 0.1;
    const weekendFactor = dayOfWeek === 0 || dayOfWeek === 6 ? 0.95 : 1.0;
    
    // Competitor pricing pressure
    const competitivePressure = marketConditions.competitorIndex;
    
    // Claims frequency impact
    const claimsImpact = 1 + (marketConditions.claimFrequency - 0.1) * 2;
    
    // Economic factors
    const inflationImpact = 1 + marketConditions.inflationRate;
    
    return {
      timeVolatility,
      weekendFactor,
      competitivePressure,
      claimsImpact,
      inflationImpact,
      overallMarketFactor: competitivePressure * claimsImpact * inflationImpact * weekendFactor
    };
  };

  // Advanced Pricing Algorithm
  const calculatePremium = (riskProfile, marketAnalysis) => {
    const basePremium = 800; // Base annual premium
    
    // Risk-adjusted premium
    const riskAdjustedPremium = basePremium * (riskProfile.totalRisk / 100);
    
    // Market adjustments
    const marketAdjustedPremium = riskAdjustedPremium * marketAnalysis.overallMarketFactor;
    
    // Profit margin and operational costs
    const operationalCosts = marketAdjustedPremium * 0.15;
    const profitMargin = marketAdjustedPremium * 0.12;
    
    // Regulatory reserves
    const regulatoryReserve = marketAdjustedPremium * 0.08;
    
    const totalPremium = marketAdjustedPremium + operationalCosts + profitMargin + regulatoryReserve;
    
    return {
      basePremium,
      riskAdjustedPremium,
      marketAdjustedPremium,
      operationalCosts,
      profitMargin,
      regulatoryReserve,
      totalPremium
    };
  };

  // Generate explanation for pricing
  const generateExplanation = (riskProfile, marketAnalysis, premium) => {
    const explanations = [];
    
    if (riskProfile.ageRisk > 1.1) {
      explanations.push("Higher premium due to age-related risk factors");
    } else if (riskProfile.ageRisk < 0.95) {
      explanations.push("Lower premium for experienced driver age group");
    }
    
    if (riskProfile.drivingRisk > 1.5) {
      explanations.push("Significant increase due to driving record violations");
    } else if (riskProfile.drivingRisk < 0.9) {
      explanations.push("Discount applied for clean driving record");
    }
    
    if (riskProfile.creditRisk > 1.2) {
      explanations.push("Credit score impact increases premium");
    } else if (riskProfile.creditRisk < 0.9) {
      explanations.push("Excellent credit score provides discount");
    }
    
    if (marketAnalysis.competitivePressure < 0.9) {
      explanations.push("Market competition provides pricing advantage");
    }
    
    if (marketAnalysis.claimsImpact > 1.1) {
      explanations.push("Current market claims frequency affects pricing");
    }
    
    return explanations;
  };

  // Real-time calculation engine
  useEffect(() => {
    const riskProfileData = calculateRiskProfile(applicantData);
    const marketAnalysisData = analyzeMarketConditions();
    const premiumData = calculatePremium(riskProfileData, marketAnalysisData);
    const explanationData = generateExplanation(riskProfileData, marketAnalysisData, premiumData);
    
    setRiskProfile(riskProfileData);
    setPremiumBreakdown(premiumData);
    setFinalQuote(Math.round(premiumData.totalPremium));
    setExplanation(explanationData);
  }, [applicantData, marketConditions]);

  // Simulate market condition changes
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketConditions(prev => ({
        ...prev,
        competitorIndex: prev.competitorIndex + (Math.random() - 0.5) * 0.02,
        claimFrequency: Math.max(0.05, Math.min(0.25, prev.claimFrequency + (Math.random() - 0.5) * 0.005)),
        marketVolatility: Math.max(0.05, Math.min(0.3, prev.marketVolatility + (Math.random() - 0.5) * 0.01))
      }));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (field, value) => {
    setApplicantData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Dynamic Insurance Premium Calculator</h1>
        <p className="text-gray-600">AI-Powered Risk Assessment & Real-Time Pricing</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applicant Data Input */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Applicant Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <input
                type="number"
                value={applicantData.age}
                onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                className="w-full p-2 border rounded-md"
                min="18"
                max="80"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                value={applicantData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <select
                value={applicantData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="urban">Urban</option>
                <option value="suburban">Suburban</option>
                <option value="rural">Rural</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Vehicle Year</label>
              <input
                type="number"
                value={applicantData.vehicleYear}
                onChange={(e) => handleInputChange('vehicleYear', parseInt(e.target.value))}
                className="w-full p-2 border rounded-md"
                min="1990"
                max="2024"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Vehicle Type</label>
              <select
                value={applicantData.vehicleType}
                onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="truck">Truck</option>
                <option value="sports">Sports Car</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Driving Record</label>
              <select
                value={applicantData.drivingRecord}
                onChange={(e) => handleInputChange('drivingRecord', e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="clean">Clean</option>
                <option value="minor">Minor Violations</option>
                <option value="major">Major Violations</option>
                <option value="severe">Severe Violations</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Credit Score</label>
              <input
                type="number"
                value={applicantData.creditScore}
                onChange={(e) => handleInputChange('creditScore', parseInt(e.target.value))}
                className="w-full p-2 border rounded-md"
                min="300"
                max="850"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Annual Mileage</label>
              <input
                type="number"
                value={applicantData.annualMileage}
                onChange={(e) => handleInputChange('annualMileage', parseInt(e.target.value))}
                className="w-full p-2 border rounded-md"
                min="1000"
                max="50000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Coverage Type</label>
              <select
                value={applicantData.coverageType}
                onChange={(e) => handleInputChange('coverageType', e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="liability">Liability Only</option>
                <option value="collision">Collision</option>
                <option value="comprehensive">Comprehensive</option>
                <option value="full">Full Coverage</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Risk Profile & Market Analysis */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Age Risk Factor</span>
                <span className="font-medium">{riskProfile.ageRisk?.toFixed(2)}x</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Location Risk</span>
                <span className="font-medium">{riskProfile.locationRisk?.toFixed(2)}x</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Vehicle Risk</span>
                <span className="font-medium">{riskProfile.vehicleRisk?.toFixed(2)}x</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Driving Record</span>
                <span className="font-medium">{riskProfile.drivingRisk?.toFixed(2)}x</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Credit Impact</span>
                <span className="font-medium">{riskProfile.creditRisk?.toFixed(2)}x</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Mileage Risk</span>
                <span className="font-medium">{riskProfile.mileageRisk?.toFixed(2)}x</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between items-center font-bold">
                <span>Total Risk Score</span>
                <span className="text-lg">{riskProfile.totalRisk?.toFixed(0)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Conditions & Final Quote */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Market Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Competitor Index</span>
                <span className="font-medium">{marketConditions.competitorIndex?.toFixed(3)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Claims Frequency</span>
                <span className="font-medium">{(marketConditions.claimFrequency * 100)?.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Market Volatility</span>
                <span className="font-medium">{(marketConditions.marketVolatility * 100)?.toFixed(1)}%</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-4 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <DollarSign className="w-6 h-6" />
                <span className="text-sm uppercase tracking-wide">Annual Premium</span>
              </div>
              <div className="text-3xl font-bold">${finalQuote?.toLocaleString()}</div>
              <div className="text-sm opacity-90">${Math.round(finalQuote / 12)}/month</div>
            </div>
          </CardContent>
        </Card>

        {/* Premium Breakdown */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Premium Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Base Premium</span>
                  <span>${premiumBreakdown.basePremium?.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Risk Adjustment</span>
                  <span>${(premiumBreakdown.riskAdjustedPremium - premiumBreakdown.basePremium)?.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Market Adjustment</span>
                  <span>${(premiumBreakdown.marketAdjustedPremium - premiumBreakdown.riskAdjustedPremium)?.toFixed(0)}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Operational Costs</span>
                  <span>${premiumBreakdown.operationalCosts?.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Profit Margin</span>
                  <span>${premiumBreakdown.profitMargin?.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Regulatory Reserve</span>
                  <span>${premiumBreakdown.regulatoryReserve?.toFixed(0)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Explanation */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Pricing Factors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {explanation.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Activity className="w-4 h-4 mt-1 text-blue-500 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-sm">
          <Activity className="w-4 h-4 text-green-500" />
          <span className="text-sm text-gray-600">Real-time pricing updates every 3 seconds</span>
        </div>
      </div>
    </div>
  );
};

export default InsurancePremiumCalculator;