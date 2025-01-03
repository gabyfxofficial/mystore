import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../styles/FilterSidebar.css";

function FilterSidebar({ filters, setFilters }) {
  const [isVisible, setIsVisible] = useState(true);
  const [search, setSearch] = useState(filters.search || "");
  const [selectedModels, setSelectedModels] = useState(filters.models || []);
  const [selectedStorage, setSelectedStorage] = useState(filters.storage || []);
  const [selectedColors, setSelectedColors] = useState(filters.colors || []);
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice || 3000);

  useEffect(() => {
    setSearch(filters.search || "");
    setSelectedModels(filters.models || []);
    setSelectedStorage(filters.storage || []);
    setSelectedColors(filters.colors || []);
    setMaxPrice(filters.maxPrice || 3000);
  }, [filters]);

  const handleApplyFilters = () => {
    setFilters({
      search,
      models: selectedModels,
      storage: selectedStorage,
      colors: selectedColors,
      maxPrice,
    });
  };

  const handleResetFilters = () => {
    setSearch("");
    setSelectedModels([]);
    setSelectedStorage([]);
    setSelectedColors([]);
    setMaxPrice(3000);
    setFilters({
      search: "",
      models: [],
      storage: [],
      colors: [],
      maxPrice: 3000,
    });
  };

  return (
    <div>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="toggle-sidebar-button"
        aria-label="Toggle Sidebar"
      >
        <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} />
      </button>
      {isVisible && (
        <aside className="filter-sidebar">
          <h3>Search Product</h3>
          <input
            type="text"
            placeholder="Type product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />

          <div className="filter-section">
            <h4>Price Range</h4>
            <div className="price-slider-container">
              <input
                type="range"
                min="0"
                max="3000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="slider-range"
              />
              <div className="price-display">
                <span>0$</span>
                <span>{maxPrice}$</span>
              </div>
            </div>
          </div>

          <div className="filter-section">
            <h4>Model</h4>
            <ul>
              {["iPhone 16", "iPhone 15", "iPhone 14", "iPhone 13"].map(
                (model, index) => (
                  <li key={`model-${index}`}>
                    <label>
                      <input
                        type="checkbox"
                        value={model}
                        checked={selectedModels.includes(model)}
                        onChange={() =>
                          setSelectedModels((prev) =>
                            prev.includes(model)
                              ? prev.filter((item) => item !== model)
                              : [...prev, model]
                          )
                        }
                      />
                      {model}
                    </label>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="filter-section">
            <h4>Storage</h4>
            <ul>
              {["128GB", "256GB", "512GB", "1TB"].map((storage, index) => (
                <li key={`storage-${index}`}>
                  <label>
                    <input
                      type="checkbox"
                      value={storage}
                      checked={selectedStorage.includes(storage)}
                      onChange={() =>
                        setSelectedStorage((prev) =>
                          prev.includes(storage)
                            ? prev.filter((item) => item !== storage)
                            : [...prev, storage]
                        )
                      }
                    />
                    {storage}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-section">
            <h4>Color</h4>
            <ul>
              {["Black", "Red", "White", "Blue"].map((color, index) => (
                <li key={`color-${index}`}>
                  <label>
                    <input
                      type="checkbox"
                      value={color}
                      checked={selectedColors.includes(color)}
                      onChange={() =>
                        setSelectedColors((prev) =>
                          prev.includes(color)
                            ? prev.filter((item) => item !== color)
                            : [...prev, color]
                        )
                      }
                    />
                    {color}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-buttons">
            <button onClick={handleApplyFilters} className="apply-button">
              Apply
            </button>
            <button onClick={handleResetFilters} className="reset-button">
              Reset
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}

export default FilterSidebar;
