import { useState } from 'react'
import './App.css'
import MultiSelectDropdown from './Components/DropDownWithMultiSelect'

function App(){
const [showDropDown, setShowDropdown]=useState<Boolean>(false)
const [selectedItems, setSelectedItems] = useState(['apple']); // 'apple' is selected by default

// 2. Prepare the complete option list data source
const fruitOptions = [
  { value: 'apple', label: '🍎 Apple' },
  { value: 'banana', label: '🍌 Banana' },
  { value: 'cherry', label: '🍒 Cherry' },
  { value: 'grape', label: '🍇 Grape' },
  { value: 'orange', label: '🍊 Orange' }
];
  return (
   <>
<MultiSelectDropdown
        options={fruitOptions}
        selectedValues={selectedItems}
        onChange={setSelectedItems}
        placeholder="Pick some fruits..."
      />
   </>
   
  )
}

export default App
