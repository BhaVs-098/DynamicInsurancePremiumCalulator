import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Shield, AlertCircle, CheckCircle, BarChart3, Brain, DollarSign } from 'lucide-react';

// Risk Assessment Engine
class RiskAssessmentEngine {
  constructor() {
    this.riskFactors = {
      age: { weight: 0.15, curve: 'u_shaped' },
      drivingHistory: { weight: 0.25, curve: 'exponential' },
      vehicleType: { weight: 0.20, curve: 'linear' },
      location: { weight: 0.15, curve: 'categorical' },
      creditScore: { weight: 0.12, curve: 'inverse' },
      mileage: { weight: 0.08, curve: 'linear' },
      experience: { weight: 0.05, curve: 'inverse' }
    };
  }

  calculateRiskScore(applicantData) {
    let totalScore = 0;
    const breakdown = {};

    // Age risk (U-shaped curve - higher risk for very young and very old)
    const ageRisk = this.calculateAgeRisk(applicantData.age);
    totalScore += ageRisk * this.riskFactors.age.weight;
    breakdown.age = { score: ageRisk, weight: this.riskFactors.age.weight };

    // Driving history risk
    const drivingRisk = this.calculateDrivingRisk(applicantData.accidents, applicantData.violations);
    totalScore += drivingRisk * this.riskFactors.drivingHistory.weight;
    breakdown.drivingHistory = { score: drivingRisk, weight: this.riskFactors.drivingHistory.weight };

    // Vehicle type risk
    const vehicleRisk = this.calculateVehicleRisk(applicantData.vehicleType, applicantData.vehicleValue);
    totalScore += vehicleRisk * this.riskFactors.vehicleType.weight;
    breakdown.vehicleType = { score: vehicleRisk, weight: this.riskFactors.vehicleType.weight };

    // Location risk
    const locationRisk = this.calculateLocationRisk(applicantData.zipCode);
    totalScore += locationRisk * this.riskFactors.location.weight;
    breakdown.location = { score: locationRisk, weight: this.riskFactors.location.weight };

    // Credit score risk
    const creditRisk = this.calculateCreditRisk(applicantData.creditScore);
    totalScore += creditRisk * this.riskFactors.creditScore.weight;
    breakdown.creditScore = { score: creditRisk, weight: this.riskFactors.creditScore.weight };

    // Mileage risk
    const mileageRisk = this.calculateMileageRisk(applicantData.annualMileage);
    totalScore += mileageRisk * this.riskFactors.mileage.weight;
    breakdown.mileage = { score: mileageRisk, weight: this.riskFactors.mileage.weight };

    // Experience risk
    const experienceRisk = this.calculateExperienceRisk(applicantData.yearsLicensed);
    totalScore += experienceRisk * this.riskFactors.experience.weight;
    breakdown.experience = { score: experienceRisk, weight: this.riskFactors.experience.weight };

    return {
      totalScore: Math.min(Math.max(totalScore, 0), 1),
      breakdown,
      riskLevel: this.getRiskLevel(totalScore)
    };
  }

  calculateAgeRisk(age) {
    if (age < 25) return 0.8 - (age - 16) * 0.05;
    if (age > 65) return 0.3 + (age - 65) * 0.02;
    return 0.2 + Math.abs(age - 45) * 0.003;
  }

  calculateDrivingRisk(accidents, violations) {
    const baseRisk = 0.1;
    const accidentPenalty = accidents * 0.15;
    const violationPenalty = violations * 0.08;
    return Math.min(baseRisk + accidentPenalty + violationPenalty, 1);
  }

  calculateVehicleRisk(type, value) {
    const typeRisk = {
      'sedan': 0.2,
      'suv': 0.3,
      'truck': 0.4,
      'sports': 0.7,
      'luxury': 0.6,
      'economy': 0.15
    };
    const valueMultiplier = Math.min(value / 50000, 2);
    return (typeRisk[type] || 0.3) * valueMultiplier;
  }

  calculateLocationRisk(zipCode) {
    // Simplified location risk based on zip code patterns
    const lastDigit = parseInt(zipCode.slice(-1));
    const urbanRisk = lastDigit < 5 ? 0.4 : 0.2;
    return urbanRisk;
  }

  calculateCreditRisk(score) {
    if (score >= 750) return 0.1;
    if (score >= 650) return 0.2;
    if (score >= 550) return 0.4;
    return 0.6;
  }

  calculateMileageRisk(mileage) {
    return Math.min(mileage / 30000, 1) * 0.3;
  }

  calculateExperienceRisk(years) {
    return Math.max(0.5 - years * 0.03, 0.05);
  }

  getRiskLevel(score) {
    if (score < 0.3) return 'Low';
    if (score < 0.5) return 'Medium';
    if (score < 0.7) return 'High';
    return 'Very High';
  }
}

// Market Analysis Engine
class MarketAnalyzer {
  constructor() {
    this.marketConditions = {
      competitiveIndex: 0.85,
      seasonalFactor: 1.02,
      economicFactor: 0.98,
      regulatoryFactor: 1.01,
      claimsTrend: 1.05
    };
  }

  getMarketAdjustment() {
    const { competitiveIndex, seasonalFactor, economicFactor, regulatoryFactor, claimsTrend } = this.marketConditions;
    
    // Competitive pressure (lower prices in competitive market)
    const competitiveAdjustment = competitiveIndex;
    
    // Seasonal trends (higher in winter, lower in summer)
    const month = new Date().getMonth();
    const seasonalAdjustment = month >= 10 || month <= 2 ? 1.08 : 0.95;
    
    // Economic conditions
    const economicAdjustment = economicFactor;
    
    // Regulatory environment
    const regulatoryAdjustment = regulatoryFactor;
    
    // Claims trend
    const claimsTrendAdjustment = claimsTrend;

    const totalAdjustment = competitiveAdjustment * seasonalAdjustment * economicAdjustment * regulatoryAdjustment * claimsTrendAdjustment;

    return {
      adjustment: totalAdjustment,
      factors: {
        competitive: competitiveAdjustment,
        seasonal: seasonalAdjustment,
        economic: economicAdjustment,
        regulatory: regulatoryAdjustment,
        claimsTrend: claimsTrendAdjustment
      }
    };
  }

  updateMarketConditions() {
    // Simulate real-time market data updates
    this.marketConditions.competitiveIndex += (Math.random() - 0.5) * 0.02;
    this.marketConditions.economicFactor += (Math.random() - 0.5) * 0.01;
    this.marketConditions.claimsTrend += (Math.random() - 0.5) * 0.01;
  }
}

// Pricing Calculator
class PricingCalculator {
  constructor() {
    this.basePremium = 1200;
    this.profitMargin = 0.15;
    this.operationalCosts = 0.12;
    this.reserveRequirement = 0.08;
  }

  calculatePremium(riskScore, marketAdjustment, coverageLevel) {
    // Base premium calculation
    const riskMultiplier = 1 + (riskScore * 2);
    const riskAdjustedPremium = this.basePremium * riskMultiplier;

    // Coverage level adjustment
    const coverageMultiplier = {
      'basic': 0.7,
      'standard': 1.0,
      'comprehensive': 1.4,
      'premium': 1.8
    };
    
    const coverageAdjustedPremium = riskAdjustedPremium * (coverageMultiplier[coverageLevel] || 1.0);

    // Market adjustment
    const marketAdjustedPremium = coverageAdjustedPremium * marketAdjustment;

    // Add costs and margin
    const totalCostMultiplier = 1 + this.profitMargin + this.operationalCosts + this.reserveRequirement;
    const finalPremium = marketAdjustedPremium * totalCostMultiplier;

    return {
      basePremium: this.basePremium,
      riskAdjustedPremium: riskAdjustedPremium,
      coverageAdjustedPremium: coverageAdjustedPremium,
      marketAdjustedPremium: marketAdjustedPremium,
      finalPremium: finalPremium,
      breakdown: {
        riskMultiplier,
        coverageMultiplier: coverageMultiplier[coverageLevel],
        marketAdjustment,
        profitMargin: this.profitMargin,
        operationalCosts: this.operationalCosts,
        reserveRequirement: this.reserveRequirement
      }
    };
  }
}

// Main Component
const DynamicInsuranceCalculator = () => {
  const [applicantData, setApplicantData] = useState({
    age: 30,
    yearsLicensed: 10,
    accidents: 0,
    violations: 0,
    vehicleType: 'sedan',
    vehicleValue: 25000,
    zipCode: '12345',
    creditScore: 700,
    annualMileage: 12000,
    coverageLevel: 'standard'
  });

  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [riskEngine] = useState(new RiskAssessmentEngine());
  const [marketAnalyzer] = useState(new MarketAnalyzer());
  const [pricingCalculator] = useState(new PricingCalculator());

  const calculateQuote = async () => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Update market conditions
    marketAnalyzer.updateMarketConditions();

    // Calculate risk score
    const riskAssessment = riskEngine.calculateRiskScore(applicantData);
    
    // Get market adjustment
    const marketAnalysis = marketAnalyzer.getMarketAdjustment();
    
    // Calculate premium
    const pricing = pricingCalculator.calculatePremium(
      riskAssessment.totalScore,
      marketAnalysis.adjustment,
      applicantData.coverageLevel
    );

    setQuote({
      riskAssessment,
      marketAnalysis,
      pricing,
      timestamp: new Date().toISOString()
    });

    setLoading(false);
  };

  const handleInputChange = (field, value) => {
    setApplicantData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getRiskColor = (level) => {
    switch(level) {
      case 'Low': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'High': return 'text-orange-600';
      case 'Very High': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Shield className="text-blue-600" />
          Dynamic Insurance Premium Calculator
        </h1>
        <p className="text-gray-600">Advanced AI-powered risk assessment and real-time market pricing</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Calculator className="text-blue-600" />
            Applicant Information
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Age</label>
                <input
                  type="number"
                  value={applicantData.age}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Years Licensed</label>
                <input
                  type="number"
                  value={applicantData.yearsLicensed}
                  onChange={(e) => handleInputChange('yearsLicensed', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Accidents (5 years)</label>
                <input
                  type="number"
                  value={applicantData.accidents}
                  onChange={(e) => handleInputChange('accidents', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Violations (5 years)</label>
                <input
                  type="number"
                  value={applicantData.violations}
                  onChange={(e) => handleInputChange('violations', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Vehicle Type</label>
              <select
                value={applicantData.vehicleType}
                onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="truck">Truck</option>
                <option value="sports">Sports Car</option>
                <option value="luxury">Luxury</option>
                <option value="economy">Economy</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Vehicle Value ($)</label>
              <input
                type="number"
                value={applicantData.vehicleValue}
                onChange={(e) => handleInputChange('vehicleValue', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">ZIP Code</label>
                <input
                  type="text"
                  value={applicantData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Credit Score</label>
                <input
                  type="number"
                  value={applicantData.creditScore}
                  onChange={(e) => handleInputChange('creditScore', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Annual Mileage</label>
              <input
                type="number"
                value={applicantData.annualMileage}
                onChange={(e) => handleInputChange('annualMileage', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Coverage Level</label>
              <select
                value={applicantData.coverageLevel}
                onChange={(e) => handleInputChange('coverageLevel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="comprehensive">Comprehensive</option>
                <option value="premium">Premium</option>
              </select>
            </div>

            <button
              onClick={calculateQuote}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Calculating...
                </>
              ) : (
                <>
                  <Brain className="h-5 w-5" />
                  Calculate Premium
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {quote && (
            <>
              {/* Premium Quote */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <DollarSign className="text-green-600" />
                  Your Premium Quote
                </h2>
                
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    ${quote.pricing.finalPremium.toFixed(2)}
                  </div>
                  <div className="text-gray-600">Annual Premium</div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="font-medium">Monthly</div>
                    <div className="text-lg">${(quote.pricing.finalPremium / 12).toFixed(2)}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="font-medium">6-Month</div>
                    <div className="text-lg">${(quote.pricing.finalPremium / 2).toFixed(2)}</div>
                  </div>
                </div>
              </div>

              {/* Risk Assessment */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle className="text-orange-600" />
                  Risk Assessment
                </h2>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span>Overall Risk Level</span>
                    <span className={`font-semibold ${getRiskColor(quote.riskAssessment.riskLevel)}`}>
                      {quote.riskAssessment.riskLevel}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-red-500 h-2 rounded-full"
                      style={{ width: `${quote.riskAssessment.totalScore * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Risk Score: {(quote.riskAssessment.totalScore * 100).toFixed(1)}%
                  </div>
                </div>

                <div className="space-y-2">
                  {Object.entries(quote.riskAssessment.breakdown).map(([factor, data]) => (
                    <div key={factor} className="flex justify-between items-center text-sm">
                      <span className="capitalize">{factor.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="font-medium">
                        {(data.score * data.weight * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Market Analysis */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="text-blue-600" />
                  Market Analysis
                </h2>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span>Market Adjustment</span>
                    <span className={`font-semibold ${quote.marketAnalysis.adjustment > 1 ? 'text-red-600' : 'text-green-600'}`}>
                      {quote.marketAnalysis.adjustment > 1 ? '+' : ''}{((quote.marketAnalysis.adjustment - 1) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {Object.entries(quote.marketAnalysis.factors).map(([factor, value]) => (
                    <div key={factor} className="flex justify-between items-center text-sm">
                      <span className="capitalize">{factor.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className={`font-medium ${value > 1 ? 'text-red-600' : 'text-green-600'}`}>
                        {value > 1 ? '+' : ''}{((value - 1) * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="text-purple-600" />
                  Pricing Breakdown
                </h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Base Premium</span>
                    <span>${quote.pricing.basePremium.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Risk Adjustment</span>
                    <span>${(quote.pricing.riskAdjustedPremium - quote.pricing.basePremium).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Coverage Adjustment</span>
                    <span>${(quote.pricing.coverageAdjustedPremium - quote.pricing.riskAdjustedPremium).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Market Adjustment</span>
                    <span>${(quote.pricing.marketAdjustedPremium - quote.pricing.coverageAdjustedPremium).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Operational Costs & Margin</span>
                    <span>${(quote.pricing.finalPremium - quote.pricing.marketAdjustedPremium).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between items-center font-semibold">
                    <span>Total Premium</span>
                    <span>${quote.pricing.finalPremium.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {!quote && (
            <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-500">
              <Shield className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>Enter your information and click "Calculate Premium" to get your personalized quote</p>
            </div>
          )}
        </div>
      </div>

      {quote && (
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Premium Calculation Complete</h3>
              <p className="text-blue-800 mb-4">
                Your premium has been calculated using our advanced AI risk assessment engine, real-time market analysis, 
                and competitive pricing algorithms. The quote is valid for 30 days and reflects current market conditions.
              </p>
              <div className="text-sm text-blue-700">
                <p><strong>Risk Factors Considered:</strong> Age, driving history, vehicle type, location, credit score, annual mileage, and driving experience</p>
                <p><strong>Market Factors:</strong> Competitive landscape, seasonal trends, economic conditions, regulatory environment, and claims trends</p>
                <p><strong>Quote Generated:</strong> {new Date(quote.timestamp).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicInsuranceCalculator;