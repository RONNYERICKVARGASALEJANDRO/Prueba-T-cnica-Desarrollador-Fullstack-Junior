import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const FilterModal = ({ visible, onClose, onApply, currentFilters }) => {
  const [filters, setFilters] = useState(currentFilters);

  const statusOptions = [
    { label: 'Todos', value: '' },
    { label: 'Pendiente', value: 'pendiente' },
    { label: 'En progreso', value: 'en progreso' },
    { label: 'Completada', value: 'completada' },
  ];

  const handleApply = () => {
    onApply(filters);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Filtrar tareas</Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Estado</Text>
            {statusOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.option,
                  filters.status === option.value && styles.optionSelected
                ]}
                onPress={() => setFilters({ ...filters, status: option.value })}
              >
                <Text
                  style={[
                    styles.optionText,
                    filters.status === option.value && styles.optionTextSelected
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Aplicar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: '#f8f9fa',
  },
  optionSelected: {
    backgroundColor: '#4361ee',
  },
  optionText: {
    textAlign: 'center',
  },
  optionTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#6c757d',
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  applyButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#4361ee',
    borderRadius: 5,
  },
  applyButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default FilterModal;
